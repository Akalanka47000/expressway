import mongoose from "mongoose";
import { moduleLogger } from "@sliit-foss/module-logger";
import config from "../../config";

const logger = moduleLogger("mongo-connector");

export const connectMongo = () => {
  mongoose.connect(config.DB_URL);

  mongoose.connection.on("connected", () => {
    logger.info(`connected to mongodb on - ${config.DB_URL}`);
  });

  mongoose.connection.on("error", (err) => {
    logger.error(`mongodb connection error - ${err.message}`, err);
  });

  mongoose.connection.on("disconnected", () => {
    logger.info("mongodb disconnected");
  });

  mongoose.connection.on("reconnected", () => {
    logger.info("mongodb reconnected");
  });

  process.on("exit", () => mongoose.disconnect());
};
