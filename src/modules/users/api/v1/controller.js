import express from "express";
import { response } from "../../../../utils";
import { asyncHandler } from "../../../../middleware";

const users = express.Router();

const doSomething = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("Something went wrong in do something"));
    }, 2000);
  });
};

users.post(
  "/",
  asyncHandler(async (req, res) => {
    await doSomething();
    return response({ res, message: "Hello from users with new res function" });
  })
);

export default users;
