const sendResponse = require("../../helper/sendResponse");
const taskModel = require("../../models/taskModel");

// delete task
async function deleteTaskController(req, res) {
    try {
    const { id } = req.params;
    const userId = req.userId;
    const userRole = req.user.role;

    let task;

    // If admin, can delete any task
    if (userRole === "admin") {
      task = await taskModel.findOneAndDelete({ _id: id });
    } else {
      // If user, can only delete their own task
      task = await taskModel.findOneAndDelete({ _id: id, user: userId });
    }

    if (!task) {
      return sendResponse(res, 404, "failure", "task not found");
    }

    return sendResponse(res, 200, "success", "task deleted successfully");
  } catch (err) {
console.error(err);

    return sendResponse(
      res,
      500,
      "failure",
      "Internal server error"
    );  }
}

module.exports=deleteTaskController;