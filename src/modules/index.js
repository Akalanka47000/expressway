import express from "express";
import auth from "./auth";
import books from "./books";
import users from "./users";

const router = express.Router();

router.use(auth);
router.use(books);
router.use(users);

export default router;
