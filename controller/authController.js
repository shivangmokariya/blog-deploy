import { User } from "../model/authModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import errorHandler from "../utils/errorHandler.js";

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
     const validUser = await User.findOne({ email });
     if (!validUser) {
       return res.status(404).json({ message: "User not found" });
     }
     const validPass = bcrypt.compareSync(password, validUser.password);
     if (!validPass) {
       return res.status(401).json({ message: "Wrong Credentials" });
     }
     const token = jwt.sign(
       {
         id: validUser._id,
         username: validUser.username,
         email: validUser.email,
       },
       process.env.MYSECRETKEY
     );
     // Send the token in the response body along with a success message
     res.status(200).json({
       message: "Login successful",
       token: token,
       user: {
         id: validUser._id,
         username: validUser.username,
         email: validUser.email,
       },
     });
  } catch (error) {
     // Assuming errorHandler is a function that formats your error response
     next(errorHandler(500, "Internal Server Error"));
  }
 };
 
const RegisterUser = async (req, res, next) => {
  //add error handling m
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
