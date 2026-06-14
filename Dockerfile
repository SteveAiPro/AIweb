# 使用 Node.js 20 作为基础镜像
FROM node:20-alpine AS base

# 1. 安装依赖阶段
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json ./
RUN npm install

# 2. 构建阶段
FROM base AS builder
WORKDIR /app
COPY --from(deps) /app/node_modules ./node_modules
COPY . .
# 注意：prebuild 脚本会自动运行生成 sitemap
RUN npm run build

# 3. 运行阶段
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from(builder) /app/public ./public
COPY --from(builder) /app/.next ./.next
COPY --from(builder) /app/node_modules ./node_modules
COPY --from(builder) /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]