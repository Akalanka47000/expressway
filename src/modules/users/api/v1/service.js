import { traced } from "@sliit-foss/functions";
import { saveUser, retriveUserById, retrieveUsers, updateUserById, deleteUserById } from "../../repository";
import { hashPassword } from "../../utils";

export const addUser = async (user) => {
  user.password = await hashPassword(user.password);
  return traced(saveUser)(user);
};

export const getUser = (id) => {
  return traced(retriveUserById)(id);
};

export const getUsers = (filters, sorts, page, limit) => {
  return traced(retrieveUsers)(filters, sorts, page, limit);
};

export const updateUser = (id, payload) => {
  return traced(updateUserById)(id, payload);
};

export const deleteUser = (id) => {
  return traced(deleteUserById)(id);
};
