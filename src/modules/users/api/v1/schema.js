import { Joi } from "celebrate";

export const addUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  mobile_no: Joi.string().optional()
});

export const updateUserSchema = Joi.object({
  name: Joi.string().optional(),
  mobile_no: Joi.string().email().optional()
});
