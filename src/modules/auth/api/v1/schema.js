import { Joi } from "celebrate";

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

export const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  mobile_no: Joi.string().optional()
});

export const refreshTokenSchema = Joi.object({
  refresh_token: Joi.string().required()
});
