import { User } from "../model/authModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import errorHandler from "../utils/errorHandler.js";
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      next(errorHandler(404, "User not found"));
    }
    const validPass = bcrypt.compareSync(password, validUser.password);
    if (!validPass) {
      next(errorHandler(401, "Wrong Credentials"));
    }
    const token = jwt.sign(
      {
        id: validUser._id,
        username: validUser.username,
        email: validUser.email,
      },
      process.env.MYSECRETKEY
    );
    res.cookie("access_token", token).status(200).json(validUser);
  } catch (error) {
    next(error);
  }
};
const RegisterUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashPass = bcrypt.hashSync(password, 10);
  try {
    const user = await User.create({ username, email, password: hashPass });
    res.status(201).json({data:user});
  } catch (error) {
    next(error);
  }
};

export { loginUser, RegisterUser };
