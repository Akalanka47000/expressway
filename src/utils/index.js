export * from "./response";

export const createEnum = (arr) => {
  return arr.reduce((acc, item) => {
    acc[item] = item;
    return acc;
  }, {});
};
