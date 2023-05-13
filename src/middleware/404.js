import { response } from "../utils";

export const resourceNotFoundHandler = (_req, res) => {
  if (!res.headersSent) {
    return response({ res, status: 404, message: "Resource which you requested for does not exist in this server" });
  }
};
