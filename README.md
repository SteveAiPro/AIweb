# AI Navigator

一个基于 Next.js 16 构建的原创 AI 工具导航站示例，包含首页目录、分类页、工具详情页，以及本地 Docker 部署方案。

## 本地开发

先安装依赖：

```bash
npm install
```

配置 Supabase 邮箱登录：

```bash
cp .env.local.example .env.local
```

然后在 Supabase 控制台复制项目配置：

- `Project Settings` -> `API` -> 填入 `NEXT_PUBLIC_SUPABASE_URL`
- `Project Settings` -> `API` -> 填入 `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `Authentication` -> `URL Configuration` -> `Site URL` 填 `http://localhost:3000`
- `Authentication` -> `URL Configuration` -> `Redirect URLs` 加入 `http://localhost:3000/auth/callback`

部署到线上后，还需要把生产域名的回调地址加入 Supabase，例如：

```text
https://your-domain.com/auth/callback
```

启动开发服务器：

```bash
npm run dev
```

打开 <http://localhost:3000> 查看页面。

## 常规检查

```bash
npm run lint
npm run build
```

## Docker 本地部署

这是当前推荐的本地 Docker 运行方式：使用生产形态容器，而不是把 `next dev` 塞进容器里。

### 1. 构建并启动

```bash
docker compose up --build
```

启动后访问：

- <http://localhost:3000>

### 2. 后台运行

```bash
docker compose up --build -d
```

### 3. 查看日志

```bash
docker compose logs -f
```

### 4. 停止并清理容器

```bash
docker compose down
```

### 5. 强制重新构建

```bash
docker compose build --no-cache
docker compose up
```

## 为什么之前会感觉“卡住”

当前项目最开始并没有 Docker 配置，所以本地“Docker 部署卡住”通常不是某个现成容器脚本内部死锁，而更可能是下面几类问题：

1. **第一次镜像构建比较慢**
   - 需要下载基础镜像
   - 需要安装 npm 依赖
   - 需要执行 `next build`

2. **没有把容器端口映射到宿主机**
   - 容器里服务起来了，但本机浏览器访问不到

3. **把宿主机目录错误挂载进容器**
   - 特别是把 `node_modules` 或 `.next` 覆盖掉时，最容易出现看似“启动了但不工作”的情况

4. **误把开发模式当成生产模式跑**
   - `next dev` 放进 Docker 在 macOS 本地经常更慢，也更容易让人误判成卡住

## 当前 Docker 方案特点

- 使用多阶段 `Dockerfile`
- 容器最终以 `next start` 启动
- 默认监听 `0.0.0.0:3000`
- 不依赖本地 `node_modules`
- 不挂载工作目录，避免覆盖构建产物

## 如果仍然卡住，优先看这里

按顺序排查：

```bash
docker compose up --build
docker compose logs -f
docker ps
```

重点看日志停在哪一段：

- 停在 `npm ci`：说明是依赖安装慢或网络问题
- 停在 `next build`：说明是构建阶段慢或构建报错
- 已经出现 `next start` / listening 信息，但页面打不开：通常是端口、浏览器地址或容器状态问题

如果你愿意，我下一步可以继续直接帮你把这个项目补上：

- 更轻量的 `standalone` Docker 产物
- 开发环境专用 `docker-compose.dev.yml`
- 健康检查（healthcheck）
- 一键启动脚本
