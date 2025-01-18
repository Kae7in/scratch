FROM node:20-alpine
RUN apk add --no-cache g++ make python3 py3-pip openssl

WORKDIR /app

COPY . .

RUN npm install -g pnpm

RUN pnpm install --frozen-lockfile

COPY node_modules/.pnpm/@prisma+client@6.2.1_prisma@6.2.1/node_modules/.prisma/client/sql/ /app/node_modules/.pnpm/@prisma+client@6.2.1_prisma@6.2.1/node_modules/.prisma/client/sql/

RUN cd apps/web-server && pnpm run build

EXPOSE 8080

ENV NODE_ENV production
ENV HOST ::

CMD ["node", "--stack-size=8192", "apps/server/dist/server.js"]
