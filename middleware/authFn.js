const jwt = require("jsonwebtoken");
const sendResponse = require("../helper/sendResponse");
const userModel=require("../models/userModel");

async function authFn(req, res, next) {
  const userCookie = req.cookies?.Assignment;
  if (!userCookie) {
    return sendResponse(res, 401, "failure", "unauthorized");
  }

  try {
    const decoded = jwt.verify(userCookie, process.env.SECRET_KEY);
    // Fetch the full user from database
    const user = await userModel.findById(decoded.id);

    if (!user) {
      return sendResponse(res, 401, "failure", "user not found");
    }

    // Store full user object
    req.user = user;

    // only saving user id  
    req.userId = decoded.id;

    next();
  } catch {
    return sendResponse(res, 401, "failure", "invalid token");
  }
}

module.exports = authFn;
