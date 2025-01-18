import fastifyCookie, { FastifyCookieOptions } from "@fastify/cookie";
import fastifyCors from "@fastify/cors";
import fastifyCsrf from "@fastify/csrf-protection";
import formBodyPlugin from "@fastify/formbody";
import fastifyJwt from "@fastify/jwt";
import FastifyMultipart from "@fastify/multipart";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import dotenv from "dotenv";
import fastify, { FastifyPluginAsync } from "fastify";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import qs from "qs";

import {
  CLIENT_ORIGIN,
  COOKIE_OPTIONS,
  COOKIE_SECRET,
  JWT_SECRET,
  NODE_ENV,
} from "./libs/constants.js";
import { envToLogger } from "./libs/logger.js";
import { cookieName } from "./libs/utils.js";
import sensible from "./plugins/sensible.js";
import Root from "./routes/root.js";
import HealthRoutes from "./routes/health/index.js";

dotenv.config({ path: `.env.local` });

export type AppOptions = {
  // Place your custom options for app below here.
};

// Pass --options via CLI arguments in command to enable these options.
const options: AppOptions = {};

const build: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts
): Promise<void> => {
  fastify.register(fastifyCors, {
    origin: CLIENT_ORIGIN,
    credentials: true,
    optionsSuccessStatus: 200,
  });

  fastify.setValidatorCompiler(validatorCompiler);
  fastify.setSerializerCompiler(serializerCompiler);

  fastify.register(fastifySwagger, {
    openapi: {
      openapi: "3.1.0",
      info: {
        title: "Scratch Server",
        summary: "API for the Scratch server.",
        description: "All hail our mighty monolith!",
        version: "0.0.1",
      },
      servers: [],
    },
    transform: jsonSchemaTransform,
  });

  fastify.register(fastifySwaggerUI, {
    routePrefix: "/docs",
  });

  fastify.register(fastifyJwt, {
    secret: JWT_SECRET,
    cookie: {
      cookieName: cookieName("auth-token"),
      signed: true,
    },
  });

  fastify.register(fastifyCookie, {
    secret: COOKIE_SECRET,
    parseOptions: {},
  } as FastifyCookieOptions);
  fastify.register(fastifyCsrf, {
    cookieOpts: COOKIE_OPTIONS,
  });

  fastify.register(FastifyMultipart, {
    throwFileSizeLimit: true,
    limits: {
      files: 1,
      fileSize: 1024 * 1024 * 10, // 10MB
    },
  });
  fastify.register(formBodyPlugin);

  fastify.register(sensible);

  fastify.register(Root);
  fastify.register(HealthRoutes, { prefix: "/health" });

  fastify.setNotFoundHandler((request, reply) => {
    reply.header("Access-Control-Allow-Origin", [CLIENT_ORIGIN]);
    reply.header("Access-Control-Allow-Credentials", "true");
    reply.code(404).send({
      error: "Not Found",
      route: request.url,
    });
  });
};

const app = fastify({
  logger: envToLogger[NODE_ENV as keyof typeof envToLogger],
  maxParamLength: 1000,
  disableRequestLogging: true,
  querystringParser: (str) => qs.parse(str),
});

app.register(build, options);

export default app;
export { app, options };
