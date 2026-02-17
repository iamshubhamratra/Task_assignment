const sendResponse = require("../../helper/sendResponse");

async function logout(req, res) {
  try {
    res.clearCookie("Assignment");
    return sendResponse(res, 200, "success", "user logged out successfully");
  } catch (err) {
console.error(err);

    return sendResponse(
      res,
      500,
      "failure",
      "Internal server error"
    );    }
  }

module.exports = logout;
