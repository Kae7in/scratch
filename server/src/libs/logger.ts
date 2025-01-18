import dotenv from "dotenv";

dotenv.config({ path: `.env.local` });

export const envToLogger = {
  development: {
    transport: {
      target: "pino-pretty",
      options: {
        destination: 2,
        colorize: true,
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
  staging: {
    transport: {
      targets: [
        {
          target: "@logtail/pino",
          options: {
            sourceToken: process.env.LOGTAIL_SOURCE_TOKEN,
          },
        },
        {
          target: "pino-pretty",
          options: {
            colorize: true,
            minimumLevel: "warn",
            translateTime: "HH:MM:ss Z",
            ignore: "pid,hostname",
          },
        },
      ],
    },
  },
  production: {
    transport: {
      targets: [
        {
          target: "@logtail/pino",
          options: {
            sourceToken: process.env.LOGTAIL_SOURCE_TOKEN,
          },
        },
        {
          target: "pino-pretty",
          options: {
            colorize: true,
            minimumLevel: "warn",
            translateTime: "HH:MM:ss Z",
            ignore: "pid,hostname",
          },
        },
      ],
    },
  },
};
