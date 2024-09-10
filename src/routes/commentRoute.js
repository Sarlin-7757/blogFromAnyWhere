import {Router} from "express";
import { createCommentByTitle, getCommentsForBlogByTitle } from "../controllers/commentController.js";

const CommentRouter = Router();


CommentRouter.get('/:title', getCommentsForBlogByTitle);
CommentRouter.post('/:title',createCommentByTitle);


export default CommentRouter;

