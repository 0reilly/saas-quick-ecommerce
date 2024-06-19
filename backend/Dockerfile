FROM node:18-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

COPY .env ./

RUN pnpm run ci:build

CMD ["pnpm", "run", "start"]