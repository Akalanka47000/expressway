import { Book } from "./api/v1/model";

export const saveBook = (book) => {
  return Book.create(book);
};

export const retrivedBookById = (id) => {
  return Book.findById(id).lean();
};

export const retrieveBooks = (filters = {}, sorts = {}, page, limit) => {
  if (page && limit) {
    return Book.paginate(filters, { sort: sorts, page, limit, lean: true });
  }
  return Book.find(filters).sort(sorts).lean();
};

export const updateBookById = (id, book) => {
  return Book.findByIdAndUpdate(id, book, { new: true }).lean();
};

export const deleteBookById = (id) => {
  return Book.findByIdAndDelete(id).lean();
};
