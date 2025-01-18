FROM node:20-alpine
RUN apk add --no-cache g++ make python3 py3-pip openssl

WORKDIR /app

COPY . .

RUN npm install -g pnpm

RUN pnpm install --frozen-lockfile

COPY node_modules/.pnpm/@prisma+client@5.21.1_prisma@5.21.1/node_modules/.prisma/client/sql/ /app/node_modules/.pnpm/@prisma+client@5.21.1_prisma@5.21.1/node_modules/.prisma/client/sql/

RUN cd apps/web-server && pnpm run build

EXPOSE 8080

ENV NODE_ENV production
ENV HOST ::

CMD ["node", "--stack-size=8192", "apps/web-server/dist/server.js"]
