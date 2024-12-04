ARG NODE_VERSION=22-alpine

FROM node:${NODE_VERSION} AS build
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm i -g pnpm && pnpm i

COPY . .
RUN pnpm build


FROM node:${NODE_VERSION} AS runtime
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY --from=build /app/.output ./

RUN npm i -g pnpm && pnpm i --prod

EXPOSE 3000

CMD ["node", "./server/index.mjs"]