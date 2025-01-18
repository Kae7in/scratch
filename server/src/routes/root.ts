import { FastifyPluginAsync } from "fastify";

const Root: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get(
    "/",
    {
      schema: {
        tags: ["root"],
      },
    },
    async function (request, reply) {
      return `
 ██╗  ██╗ █████╗ ███████╗██╗     ██╗███╗   ██╗
 ██║ ██╔╝██╔══██╗██╔════╝██║     ██║████╗  ██║
 █████╔╝ ███████║█████╗  ██║     ██║██╔██╗ ██║
 ██╔═██╗ ██╔══██║██╔══╝  ██║     ██║██║╚██╗██║
 ██║  ██╗██║  ██║███████╗███████╗██║██║ ╚████║
 ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝╚═╝╚═╝  ╚═══╝
                                  
 Made by Kaelin.
 
 © ${new Date().getFullYear()} Kaelin.
    `;
    }
  );
};

export default Root;
