const sendResponse = require("../../helper/sendResponse");
const taskModel = require("../../models/taskModel");

// create task
async function createTaskController(req, res) {
  try {
    const { title, description } = req.taskdata;
    const userId = req.userId;

    const newTask = await taskModel.create({
      title,
      description,
      user: userId,
    });

    return sendResponse(res, 201, "success", "task created successfully", {
      task: newTask
    });
  } catch (err) {
console.error(err);

    return sendResponse(
      res,
      500,
      "failure",
      "Internal server error"
    );  }
};

module.exports=createTaskController;