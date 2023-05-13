import { moduleLogger } from "@sliit-foss/module-logger";
import { isCelebrateError } from "celebrate";
import { response } from "../utils";

const logger = moduleLogger("error-handler");

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, _req, res, _next) => {
  if (isCelebrateError(err)) {
    for (const e of err.details.values()) return response({ res, status: 400, message: e.message });
  }
  return response({ res, status: err.status ?? 500, message: err.message });
};

process.on("unhandledRejection", (reason) => {
  logger.error(reason);
});
