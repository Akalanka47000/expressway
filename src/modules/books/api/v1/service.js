import { traced } from "@sliit-foss/functions";
import { saveBook, retrivedBookById, retrieveBooks, updateBookById, deleteBookById } from "../../repository";

export const addBook = (book) => {
  return traced(saveBook)(book);
};

export const getBook = (id) => {
  return traced(retrivedBookById)(id);
};

export const getBooks = (filters, sorts, page, limit) => {
  return traced(retrieveBooks)(filters, sorts, page, limit);
};

export const updateBook = (id, payload) => {
  return traced(updateBookById)(id, payload);
};

export const deleteBook = (id) => {
  return traced(deleteBookById)(id);
};
