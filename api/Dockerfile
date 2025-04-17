FROM oven/bun:1

WORKDIR /app

COPY package.json .
COPY tsconfig.json .
COPY .env .
COPY src ./src
COPY index.ts .

RUN bun install

EXPOSE 3000

CMD ["bun", "run", "dev"] 