import { Joi } from "celebrate";
import dotenv from "dotenv";

dotenv.config();

class Base {
  static get schema() {
    return {
      PORT: Joi.number().optional(),
      APP_ENV: Joi.string().optional(),
      DB_URL: Joi.string().required(),
      JWT_SECRET: Joi.string().required(),
      ACCESS_TOKEN_EXPIRY: Joi.string().required(),
      REFRESH_TOKEN_EXPIRY: Joi.string().required()
    };
  }
  static get values() {
    return {
      PORT: process.env.PORT ?? 3000,
      APP_ENV: process.env.APP_ENV ?? "local",
      DB_URL: process.env.DB_URL,
      JWT_SECRET: process.env.JWT_SECRET,
      ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY ?? "15m",
      REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY ?? "1d"
    };
  }
}

const config = Base.values;

const { error } = Joi.object(Base.schema).validate(config);

if (error) {
  console.error(`Environment validation failed. \nDetails - ${error.details[0].message}\nExiting...`);
  process.exit(1);
}

export default config;
