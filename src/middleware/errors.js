import { moduleLogger } from "@sliit-foss/module-logger";
import { response } from "../utils";

const logger = moduleLogger("error-handler");

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, _req, res, _next) => {
  return response({ res, message: err.message });
};

process.on("unhandledRejection", (reason) => {
  logger.error(reason);
});
