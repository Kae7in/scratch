import { FastifyPluginAsync } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

const GetHealthCheck: FastifyPluginAsync = async (
  fastify,
  opts
): Promise<void> => {
  const f = fastify.withTypeProvider<ZodTypeProvider>();

  f.get(
    "/",
    {
      schema: {
        tags: ["health"],
        response: {
          200: z.object({
            status: z.string(),
            timestamp: z.string(),
          }),
        },
      },
    },
    async function (request, reply) {

      return reply.send({
        status: "ok",
        timestamp: new Date().toISOString(),
      });
    }
  );
};

export default GetHealthCheck;
