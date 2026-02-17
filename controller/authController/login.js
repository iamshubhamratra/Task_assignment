const sendResponse = require("../../helper/sendResponse");
const encPass = require("../../helper/encPassword");
const userModel = require("../../models/userModel");
const jwt = require("jsonwebtoken");

// login
async function login(req, res) {
  try {
    const { email, password } = req.userdata;

    const getUser = await userModel.findOne({ email });
    if (!getUser) {
      return sendResponse(res, 400, "failure", "wrong email or password");
    }

    const matchPass = await encPass(password, "decrypt", getUser.password);

    if (!matchPass) {
      return sendResponse(res, 400, "failure", "wrong email or password");
    } else {
      //jwt token
      const jwtToken = jwt.sign(
        { id: getUser._id?.toString() },
        process.env.SECRET_KEY,
        { expiresIn: "7d" }
      );

      //send cookies
      res.cookie("Assignment", jwtToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/",
      });

      return sendResponse(res, 200, "success", "user logged in successfully", {
        success: true,
        user: {
          email: getUser.email,
          name: getUser.name,
          role: getUser.role,
        },
      });
    }
  } catch (err) {
console.error(err);

    return sendResponse(
      res,
      500,
      "failure",
      "Internal server error"
    ); 
     }
  };


module.exports = login;
