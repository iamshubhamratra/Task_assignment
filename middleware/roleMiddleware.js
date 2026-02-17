const sendResponse = require("../helper/sendResponse");

function checkRole(allowedRoles) {
  return (req, res, next) => {
    try {
      const userRole = req.user.role;

      if (!allowedRoles.includes(userRole)) {
        return sendResponse(
          res,
          403,
          "failure",
          "you do not have permission to access this"
        );
      }

      next();
    } catch (err) {
console.error(err);

    return sendResponse(
      res,
      500,
      "failure",
      "Internal server error"
    );    }
  };
}

module.exports = checkRole;