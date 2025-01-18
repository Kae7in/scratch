// import cookie from "cookie";
import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

export const loggerPlugin = fp(async (fastify: FastifyInstance, opts) => {
  const now = () => Date.now();

  fastify.addHook("onRequest", (req, reply, done) => {
    reply.startTime = now();
    req.log.info({ url: req.raw.url, id: req.id }, `received: ${req.raw.url}`);
    done();
  });

  fastify.addHook("onResponse", (req, reply, done) => {
    req.log.info(
      {
        url: req.raw.url,
        statusCode: reply.raw.statusCode,
        durationMs: now() - reply.startTime,
      },
      `completed ${req.raw.url}`
    );
    done();
  });
});
