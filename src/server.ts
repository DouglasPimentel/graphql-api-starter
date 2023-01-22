import { createServer } from "http";
import app from "./app";
import config from "./config";
import logger from "./middlewares/logger";

(() => {
  const server = createServer(app.callback());

  server.listen(config.PORT, () => {
    logger.info(`Server listening on http://localhost:${config.PORT}/`);
  });
})();
