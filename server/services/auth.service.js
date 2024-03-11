const userModel = require("../models");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const customError = require("../utils/error");
const bcrypt = require("bcrypt");
exports.register = async (payload) => {
  try {
    const {  email, password, accountType } = payload.body;
    console.log(payload.body);
    const existingUser = await userModel.userModel.findOne({ email });

    if (existingUser) {
      throw new customError("User all ready exists", 409);
    }
    // if ( !email || !password || !accountType) {
    //   throw new customError("All fields are required", 403);
    // }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.userModel.create({
      
      email,
      password: hashedPassword,
      accountType: accountType,
    });
    return { user };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
exports.login = async (payload,res) => {
    try {
        const { email, password } = payload.body;
        if (!email || !password) {
          return res.status(400).json({
            success: false,
            message: `Please Fill up All the Required Fields`,
          });
        }
        const user = await userModel.userModel
          .findOne({ email })
          .populate("additionalDetails")
          .exec();
        if (!user) {
          throw Object.assign(new Error(), {
            name: "INVALIDUSER",
            message: "User Not  Exists!",
          });
        }
        const isCorrectPassword = bcrypt.compareSync(password, user.password);
        if (!isCorrectPassword) {
          throw Object.assign(new Error(), {
            name: "INVALIDPASSWORD",
            message: "Wrong Password",
          });
        } 
        else{
          const token = jwt.sign(
            { email: user.email, id: user._id },
            process.env.JWT_SECRET,
            {
              expiresIn: "24h",
            }
          );
          user.token = token;
          user.password = undefined;
          const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
          };
          res.cookie("token", token, options).status(200).json({
            success: true,
            token,
            user,
            message: `User Login Success`,
          });
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
  
};
