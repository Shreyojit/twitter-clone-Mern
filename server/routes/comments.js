import express from "express";
import { addComment, deleteComment, getComments, getNumberOfComments } from "../controllers/comment.js";
import { verifyToken } from "../verifyToken.js";
const router = express.Router();

router.post("/",  addComment)
router.delete("/:id",  deleteComment)
router.get("/:id", getComments)
router.get('/count/:id', getNumberOfComments);


export default router;