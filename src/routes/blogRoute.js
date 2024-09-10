import {Router} from 'express';
import { createBlogPost, getAllBlogPosts, getBlogPostByTitle } from '../controllers/blogController.js';

const BlogRouter = Router();


BlogRouter.get('/',getAllBlogPosts);
BlogRouter.get('/:title',getBlogPostByTitle);
BlogRouter.post('/', createBlogPost)

export default BlogRouter;


