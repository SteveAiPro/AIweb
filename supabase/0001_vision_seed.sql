-- Vision Seed 后端 schema（在 Supabase SQL Editor 中执行）
-- 对应仿 mkimage.ai 的用户、积分、生成记录与收藏。

-- 1) 用户资料 + 积分（注册即送 10 积分）
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  display_name text,
  credits integer not null default 10,
  created_at timestamptz not null default now ()
);

alter table public.profiles enable row level security;

drop policy if exists "Profiles viewable by owner" on public.profiles;
create policy "Profiles viewable by owner" on public.profiles
  for select using (auth.uid () = id);

drop policy if exists "Users update own profile" on public.profiles;
create policy "Users update own profile" on public.profiles
  for update using (auth.uid () = id);

-- 新用户自动建资料并送 10 积分
create or replace function public.handle_new_user ()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name)
  values (new.id, new.email, split_part(new.email, '@', 1))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user ();

-- 2) 生成记录（画廊 / 历史）
create table if not exists public.generations (
  id uuid primary key default gen_random_uuid (),
  user_id uuid references auth.users (id) on delete cascade,
  prompt text not null,
  model text,
  category text,
  aspect text,
  image_data text, -- JSON 数组：data URI 或图片 URL（程序化生成时为 SVG data URI）
  created_at timestamptz not null default now ()
);

alter table public.generations enable row level security;

drop policy if exists "Generations are public" on public.generations;
create policy "Generations are public" on public.generations
  for select using (true);

drop policy if exists "Users insert own generations" on public.generations;
create policy "Users insert own generations" on public.generations
  for insert with check (auth.uid () = user_id);

drop policy if exists "Users delete own generations" on public.generations;
create policy "Users delete own generations" on public.generations
  for delete using (auth.uid () = user_id);

-- 3) 收藏
create table if not exists public.favorites (
  user_id uuid references auth.users (id) on delete cascade,
  generation_id uuid references public.generations (id) on delete cascade,
  created_at timestamptz not null default now (),
  primary key (user_id, generation_id)
);

alter table public.favorites enable row level security;

drop policy if exists "Users manage own favorites" on public.favorites;
create policy "Users manage own favorites" on public.favorites
  for all using (auth.uid () = user_id)
  with check (auth.uid () = user_id);

-- 便于画廊按时间排序的索引
create index if not exists generations_created_at_idx on public.generations (created_at desc);
