import express from "express";
import expressHealth from "express-health-middleware";
import cors from "cors";
import helmet from "helmet";
import clusterize from "@sliit-foss/clusterizer";
import routes from "./modules";
import config from "./config";
import { errorHandler } from "./middleware";

const initialize = () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(cors());
  app.use(helmet());

  app.use("/system", expressHealth());

  app.use("/api", routes);

  app.use(errorHandler);

  app.listen(config.PORT, () => {
    console.log("Server is listening on port 3000");
  });
};

const clusterizerOptions = {};

if (config.APP_ENV === "local") clusterizerOptions.workers = 1;

clusterize(() => {
  initialize();
}, clusterizerOptions);
