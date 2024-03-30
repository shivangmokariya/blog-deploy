import { Blogs } from "../model/blogModel.js";

export const addPost = async (req, res, next) => {
  const { title, description, poster } = req.body;

  try {
    const blog = await Blogs.create({
      title: title,
      description: description,
      poster: poster,
      userID: req.user.id,
      author: req.user.username,
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
  } catch (error) {}
};

export const singleBlog = async (req, res, next) => {
  const { blogId } = req.params;

  try {
    const singleBlog = await Blogs.findById(blogId);
    res.status(200).json(singleBlog);
  } catch (error) {
    next(error);
  }
};
