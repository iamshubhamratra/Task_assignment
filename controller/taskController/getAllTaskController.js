const sendResponse = require("../../helper/sendResponse");
const taskModel = require("../../models/taskModel");

// get all tasks
async function getAllTasksController(req, res) {
  try {
    const userId = req.userId;
    const userRole = req.user.role;

    let tasks;

    // If admin, show all tasks from all users
    if (userRole === "admin") {
      tasks = await taskModel.find({}).populate("user", "name email");
    } else {
      // If regular user, show only their tasks
      tasks = await taskModel.find({ user: userId });
    }

    return sendResponse(res, 200, "success", "tasks fetched successfully", {
      count: tasks.length,
      tasks,
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

module.exports=getAllTasksController;