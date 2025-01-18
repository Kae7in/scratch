
import { FastifyInstance } from "fastify";

declare module "fastify" {
  export interface FastifyInstance {
  }

  interface FastifyRequest {
    onboardingSessionId?: string;
    anonymousId?: string;
  }

  interface FastifyReply {
    startTime: number;
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
  }
}
