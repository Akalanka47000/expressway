import express from "express";

import apiV1Routes from "./api/v1/controller";

const router = express.Router();

const module = "books";

router.use(`/v1/${module}`, apiV1Routes);

export default router;
