import { tracedAsyncHandler } from "@sliit-foss/functions";
import context from "express-http-context";
import { verify, errors } from "../utils";
import { retriveUserById } from "../modules/users/repository";

const whitelistedRoutes = ["/v1/auth/login", "/v1/auth/register", "/v1/auth/refresh-token"];

export const authorizer = tracedAsyncHandler(async function authorizer(req) {
  console.log(req.path);
  if (whitelistedRoutes.find((route) => req.path.match(new RegExp(route)))) {
    return;
  }
  const token = req.headers.authorization?.replace("Bearer ", "")?.replace("null", "");
  if (!token) {
    throw errors.missing_token;
  }
  const decodedUser = verify(token);
  const user = await retriveUserById(decodedUser._id);
  if (!user) {
    throw errors.invalid_token;
  }
  context.set("user", user);
});
