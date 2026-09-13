# 使用 Node.js 20 作为基础镜像
FROM node:20-alpine AS base

# 1. 安装依赖阶段
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
# 带上 lockfile 用 npm ci：安装可复现，且依赖没变时这一层能直接命中缓存
COPY package.json package-lock.json ./
RUN npm ci

# 2. 构建阶段
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# NEXT_PUBLIC_* 会被 Next.js 在构建期内联进客户端 bundle，必须在 build 之前注入。
# 只在运行时传这些变量是无效的——客户端代码里拿到的会是 undefined。
# （.env.local 已加入 .dockerignore，不会进镜像，所以只能靠 build args。）
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ARG SITE_URL
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV SITE_URL=$SITE_URL

RUN npm run build

# 3. 运行阶段
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]
