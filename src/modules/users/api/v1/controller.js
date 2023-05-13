import express from "express";
import { celebrate, Segments } from "celebrate";
import { traced, tracedAsyncHandler } from "@sliit-foss/functions";
import { default as filterQuery } from "@sliit-foss/mongoose-filter-query";
import { response } from "../../../../utils";
import { addUser, getUser, getUsers, updateUser, deleteUser } from "./service";
import { addUserSchema, updateUserSchema } from "./schema";

const users = express.Router();

users.post(
  "/",
  celebrate({ [Segments.BODY]: addUserSchema }),
  tracedAsyncHandler(async function addUserController(req, res) {
    const user = await traced(addUser)(req.body);
    return response({ res, message: "User added successfully", data: user });
  })
);

users.get(
  "/",
  filterQuery,
  tracedAsyncHandler(async (req, res) => {
    const users = await traced(getUsers)(req.query.filter, req.query.sort, req.query.page, req.query.limit);
    return response({ res, message: "Users retreived successfully", data: users });
  })
);

users.get(
  "/:id",
  tracedAsyncHandler(async (req, res) => {
    const user = await traced(getUser)(req.params.id);
    return response({ res, message: "User retreived successfully", data: user });
  })
);

users.patch(
  "/:id",
  celebrate({ [Segments.BODY]: updateUserSchema }),
  tracedAsyncHandler(async (req, res) => {
    const user = await traced(updateUser)(req.params.id, req.body);
    return response({ res, message: "User updated successfully", data: user });
  })
);

users.delete(
  "/:id",
  tracedAsyncHandler(async (req, res) => {
    const user = await traced(deleteUser)(req.params.id);
    return response({ res, message: "User deleted successfully", data: user });
  })
);

export default users;
