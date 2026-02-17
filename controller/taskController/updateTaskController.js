const sendResponse = require("../../helper/sendResponse");
const taskModel = require("../../models/taskModel");

// update task
async function updateTaskController(req, res) {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    const userId = req.userId;
    const userRole = req.user.role;

    let task;

    // If admin, can update any task
    if (userRole === "admin") {
      task = await taskModel.findOne({ _id: id });
    } else {
      // If user, can only update their own task
      task = await taskModel.findOne({ _id: id, user: userId });
    }

    if (!task) {
      return sendResponse(res, 404, "failure", "task not found");
    }

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (completed !== undefined) task.completed = completed;

    await task.save();

    return sendResponse(res, 200, "success", "task updated successfully", {
      task,
    });
  } catch (err) {
console.error(err);

    return sendResponse(
      res,
      500,
      "failure",
      "Internal server error"
    );  }
}

module.exports=updateTaskController;