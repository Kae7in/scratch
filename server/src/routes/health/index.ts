import { FastifyPluginAsync } from "fastify";

import GetHealthCheck from "./get.health-check.js";

const HealthRoutes: FastifyPluginAsync = async (
  fastify,
  opts
): Promise<void> => {
  fastify.register(GetHealthCheck);
};

export default HealthRoutes;
