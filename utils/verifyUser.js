import errorHandler from "./errorHandler.js";
import jwt from "jsonwebtoken";

export const verifyUser = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log(token);
  try {
    if (!token) {
      return next(errorHandler(401, "Unauthorized"));
    }

    jwt.verify(token, process.env.MYSECRETKEY, (err, user) => {
      if (err) return next(errorHandler(403, "Forbidden"));

      req.user = user;
      next();
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
