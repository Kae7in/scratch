import dotenv from "dotenv";

import { app as server } from "./app.js";
import { loggerPlugin } from "./plugins/logger.js";

dotenv.config({ path: `.env` });

if (process.env.NODE_ENV !== "development") {
  server.register(loggerPlugin);
}

server.listen(
  {
    port: Number(process.env.PORT) || 5001,
    host: process.env.HOST || "::",
  },
  (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(
      `Server listening at ${address} in ${process.env.NODE_ENV} mode`
    );
  }
);

export default server;
