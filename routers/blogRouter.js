import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import { addPost, allBlogs, singleBlog } from "../controller/BlogController.js";

const blogRouter = express.Router();

blogRouter.route("/write").post(verifyUser, addPost);
blogRouter.route("/all").get(allBlogs);
blogRouter.route("/:blogId").get(singleBlog);

export default blogRouter;
