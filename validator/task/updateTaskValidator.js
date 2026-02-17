const sendResponse = require("../../helper/sendResponse");

// update task validator
async function updateTaskValidator(req, res, next) {
  try {
    const { title, description, completed } = req.body;

    if (!title && !description && completed === undefined) {
      return sendResponse(
        res,
        400,
        "failure",
        "provide at least one field to update"
      );
    }

    req.taskdata = { title, description, completed };

    next();

  } catch (err) {
console.error(err);

    return sendResponse(
      res,
      500,
      "failure",
      "Internal server error"
    );  }
}

module.exports =  updateTaskValidator;