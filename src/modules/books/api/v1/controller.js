import express from "express";
import { celebrate, Segments } from "celebrate";
import { traced, tracedAsyncHandler } from "@sliit-foss/functions";
import { default as filterQuery } from "@sliit-foss/mongoose-filter-query";
import { response } from "../../../../utils";
import { addBook, getBook, getBooks, updateBook, deleteBook, borrowBook } from "./service";
import { addBookSchema, updateBookSchema, borrowBookSchema } from "./schema";

const books = express.Router();

books.post(
  "/",
  celebrate({ [Segments.BODY]: addBookSchema }),
  tracedAsyncHandler(async function addBookController(req, res) {
    const book = await traced(addBook)(req.body);
    return response({ res, message: "Book added successfully", data: book });
  })
);

books.get(
  "/",
  filterQuery,
  tracedAsyncHandler(async (req, res) => {
    const books = await traced(getBooks)(req.query.filter, req.query.sort, req.query.page, req.query.limit);
    return response({ res, message: "Books retreived successfully", data: books });
  })
);

books.get(
  "/:id",
  tracedAsyncHandler(async (req, res) => {
    const book = await traced(getBook)(req.params.id);
    return response({ res, message: "Book retreived successfully", data: book });
  })
);

books.patch(
  "/:id",
  celebrate({ [Segments.BODY]: updateBookSchema }),
  tracedAsyncHandler(async (req, res) => {
    const book = await traced(updateBook)(req.params.id, req.body);
    return response({ res, message: "Book updated successfully", data: book });
  })
);

books.get(
  "/:id/borrow",
  celebrate({ [Segments.PARAMS]: borrowBookSchema }),
  tracedAsyncHandler(async (req, res) => {
    const book = await traced(borrowBook)(req.params.id);
    return response({ res, message: "Book borrowed successfully", data: book });
  })
);

books.delete(
  "/:id",
  tracedAsyncHandler(async (req, res) => {
    const book = await traced(deleteBook)(req.params.id);
    return response({ res, message: "Book deleted successfully", data: book });
  })
);

export default books;
