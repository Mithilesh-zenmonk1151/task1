const authService = require("../services/auth.service");
const handleError = require("../utils/handleError");

exports.signup = async (req, res) => {
  try {
    const response = await authService.register(req);
    return res.status(200).json({
      message: "Signup successfull",
      user: response.user,
    });
  } catch (error) {
    console.log(error);
     
  }
};
exports.Login = async (req, res) => {
    console.log("respomnse login controller")
    try {
        const response = await authService.login(req, res);
        console.log("response",response);
        if (response.status === 400) {
          return res.status(400).json({
            success: false,
            message: `Please Fill up All the Required Fields`,
          });
        }
      } catch (error) {
        if (error.name === "INVALIDUSER") {
          return res.status(401).json({
            success: false,
            message: error.message,
          });
        }
        if (error.name === "INVALIDPASSWORD") {
          return res.status(401).json({
            success: false,
            message: error.message,
          });
        }
      }
  };
  