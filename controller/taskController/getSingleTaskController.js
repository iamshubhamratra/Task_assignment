const sendResponse = require("../../helper/sendResponse");
const taskModel = require("../../models/taskModel");

// get single task
async function getSingleTaskController(req, res) {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const userRole = req.user.role;

    let task;

    // If admin, can view any task
    if (userRole === "admin") {
      task = await taskModel.findOne({ _id: id }).populate("user", "name email");
    } else {
      // If user, can only view their own task
      task = await taskModel.findOne({ _id: id, user: userId });
    }

    if (!task) {
      return sendResponse(res, 404, "failure", "task not found");
    }

    return sendResponse(res, 200, "success", "task fetched successfully", {
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
};

module.exports=getSingleTaskController;