import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import { addPost, allBlogs, singleBlog ,updatePost} from "../controller/BlogController.js";

const blogRouter = express.Router();

blogRouter.route("/write").post(verifyUser, addPost);
blogRouter.route("/updatePost").post(verifyUser, updatePost);
blogRouter.route("/all").get(allBlogs);
blogRouter.route("/:blogId").get(singleBlog);

export default blogRouter;
