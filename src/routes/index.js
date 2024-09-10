import {Router} from "express";
import BlogRouter from "./blogRoute.js";
import CommentRouter from "./commentRoute.js";

const appRouter = Router();

appRouter.use("/blogs", BlogRouter)
appRouter.use("/comments", CommentRouter)


export default appRouter;