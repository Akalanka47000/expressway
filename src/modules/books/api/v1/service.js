import { traced } from "@sliit-foss/functions";
import context from "express-http-context";
import createError from "http-errors";
import { saveBook, retrivedBookById, retrieveBooks, updateBookById, deleteBookById } from "../../repository";
import { updateUserById } from "../../../users/repository";

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

export const borrowBook = async (id) => {
  const book = retrivedBookById(id);
  if (!book) {
    throw createError(404, "Book not found");
  }
  const user = context.get("user");
  if (user.books.find((bookId) => bookId === id)) {
    throw createError(409, "Book already borrowed by you");
  }
  if (book.is_borrowed) {
    throw createError(409, "Book already borrowed");
  }
  await Promise.all([updateBookById(id, { is_borrowed: true }), updateUserById(user._id, { books: [...user.books, id] })]);
  return;
};
