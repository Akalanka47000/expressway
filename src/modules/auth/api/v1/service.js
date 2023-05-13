import bcrypt from "bcryptjs";
import { traced } from "@sliit-foss/functions";
import createError from "http-errors";
import { retriveUserByEmail, retriveUserById } from "../../../users/repository";
import { errors, generateTokens, verify } from "../../../../utils";
import { addUser } from "../../../users/api/v1/service";

export const login = async (payload) => {
  const user = await traced(retriveUserByEmail)(payload.email);
  if (!user) {
    throw createError(401, errors.invalid_email);
  }
  const isPasswordValid = await bcrypt.compare(payload.password, user.password);
  if (!isPasswordValid) {
    throw createError(401, errors.invalid_password);
  }
  const tokens = await generateTokens(user);
  return { user, ...tokens };
};

export const register = async (payload) => {
  const user = await traced(retriveUserByEmail)(payload.email);
  if (user) {
    throw createError(401, "User already exists");
  }
  return addUser(payload);
};

export const refreshToken = async (token) => {
  const decodedRefreshToken = verify(token);
  const decodedUser = verify(decodedRefreshToken.access_token, true);
  const user = await retriveUserById(decodedUser._id);
  if (!user) {
    throw errors.invalid_token;
  }
  return generateTokens(user);
};
