import createError from "http-errors";

export const errors = {
  missing_token: createError(401, "Bearer token is missing"),
  invalid_token: createError(401, "Token is invalid"),
  cancelled_token: createError(401, "Token has been revoked"),
  invalid_password: createError(401, "Invalid password"),
  invalid_email: createError(401, "Invalid email"),
  token_expired: createError(401, "Token has expired"),
  unverified_user: createError(401, "User hasn't been verified yet"),
  invalid_code: createError(400, "Invalid verification code")
};
