import { traced } from "@sliit-foss/functions";
import { saveUser, retrivedUserById, retrieveUsers, updateUserById, deleteUserById } from "../../repository";

export const addUser = (user) => {
  return traced(saveUser)(user);
};

export const getUser = (id) => {
  return traced(retrivedUserById)(id);
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
