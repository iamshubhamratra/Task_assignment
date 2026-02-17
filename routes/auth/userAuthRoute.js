const express = require("express");
const authRouter = express.Router();
const signupValidator = require("../../validator/auth/signupValidator");
const signUp = require("../../controller/authController/signUp");
const loginValidator = require("../../validator/auth/loginValidator");
const login = require("../../controller/authController/login");
const logout = require("../../controller/authController/logout");

// Sign up
authRouter.post("/signup", signupValidator, signUp);

// login
authRouter.post("/login", loginValidator, login);

// logout
authRouter.get("/logout", logout);

module.exports = authRouter;
