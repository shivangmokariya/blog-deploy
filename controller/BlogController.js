import { Blogs } from "../model/blogModel.js";
import errorHandler from "../utils/errorHandler.js";

export const addPost = async (req, res, next) => {
  const { title, description, poster, category } = req.body;

  try {
    if (!title || !description || !poster || !category) {
      next(errorHandler(500, "Enter all the  fields"));
    }

    const blog = await Blogs.create({
      title: title,
      description: description,
      poster: poster,
      userID: req.user.id,
      author: req.user.username,
      category: category
    });

    res.status(200).json(blog);
  } catch (error) {
    next(error);
  }
};

export const allBlogs = async (req, res, next) => {
  try {
    const allBlogs = await Blogs.find({});
    res.status(200).json(allBlogs);
  } catch (error) {
    next(error);
  }
};

export const singleBlog = async (req, res, next) => {
  const { blogId } = req.params;

  try {
    const singleBlog = await Blogs.findById(blogId);
    if (!singleBlog) {
      next(errorHandler(404, "Blog not found"));
    }
    res.status(200).json(singleBlog);
  } catch (error) {
    next(error);
  }
};
