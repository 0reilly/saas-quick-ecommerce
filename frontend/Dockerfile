FROM node:18-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

ENV REACT_APP_API_URL=http://backend:5000

RUN pnpm run ci:build

CMD ["pnpm", "run", "start"]