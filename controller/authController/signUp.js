const user = require("../../models/userModel");
const encPass = require("../../helper/encPassword");
const sendResponse = require("../../helper/sendResponse");

// signup
async function signUp(req, res) {
  try {
    const data = req.userData;

    const { name, email, password } = data;

    const hashPassword = await encPass(password, "encrypt");

    const newUser = new user({
      name,
      email,
      password: hashPassword,
    });
    await newUser.save();

    return sendResponse(res, 200, "success", "user signed up successfully", {
      name: newUser.name,
      email: newUser.email,
    });
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

module.exports = signUp;
