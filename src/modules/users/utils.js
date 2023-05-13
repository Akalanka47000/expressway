import bcrypt from "bcryptjs";

export const hashPassword = (password) => {
  return bcrypt.hash(password, 10);
};
