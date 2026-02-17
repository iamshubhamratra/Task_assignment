const express = require("express");
const taskRouter = express.Router();
const createTaskValidator = require("../../validator/task/createTaskValidator");
const createTaskController = require("../../controller/taskController/createTaskController");
const updateTaskValidator = require("../../validator/task/updateTaskValidator")
const updateTaskController = require("../../controller/taskController/updateTaskController");
const getAllTaskController = require("../../controller/taskController/getAllTaskController");
const getSingleTaskController = require("../../controller/taskController/getSingleTaskController");
const deleteTaskController = require("../../controller/taskController/deleteTaskController");

// create task
taskRouter.post("/createTask", createTaskValidator, createTaskController);

// get all tasks
taskRouter.get("/allTask", getAllTaskController);

// get single task
taskRouter.get("/:id", getSingleTaskController);

// update task
taskRouter.put("/:id", updateTaskValidator, updateTaskController);

// delete task
taskRouter.delete("/:id", deleteTaskController);

module.exports = taskRouter;