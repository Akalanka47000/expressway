import { Joi } from "celebrate";

export const addBookSchema = Joi.object({
  name: Joi.string().required(),
  author: Joi.string().required(),
});

export const updateBookSchema = Joi.object({
  name: Joi.string().optional(),
  author: Joi.string().optional(),
});
