# Web Server

## Setup

1. Create a `.env` in the root of the Fastify server project
2. Install dependencies with `pnpm i`
3. Run the project locally with `pnpm run dev`

## Production Build

We use docker to deploy the chat server on Railway.
You can run the production build locally via docker:

1. Navigate to the monolith/ project root
2. Run `docker build -t web-server -f apps/web-server/Dockerfile .`
3. Run `docker run -p 5001:5001 web-server`
