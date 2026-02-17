const sendResponse = require("../../helper/sendResponse");

// create task validator
async function createTaskValidator(req, res, next) {
  try {
    const { title, description } = req.body;

    if (!title) {
      return sendResponse(res, 400, "failure", "title is required");
    }

    if (title.trim().length === 0) {
      return sendResponse(res, 400, "failure", "title cannot be empty");
    }
    if(description && (description.length>500)){
         return sendResponse(res, 400, "failure", "Description should be less than 500 words ");
    }

    req.taskdata = { title, description };

    next();

  } catch (err) {
console.error(err);

    return sendResponse(
      res,
      500,
      "failure",
      "Internal server error"
    );  }
};

module.exports=createTaskValidator;