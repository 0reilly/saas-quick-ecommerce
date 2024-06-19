FROM node:18-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

CMD ["pnpm", "run", "start"]