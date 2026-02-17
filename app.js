const dotenv = require("dotenv");
const express = require("express");
const cookie = require("cookie-parser");
const cors = require("cors");

const app = express();

const connectToDb = require("./db/config");
const authRouter = require("./routes/auth/userAuthRoute");
const taskRouter=require("./routes/task/taskRouter");
const authFn = require("./middleware/authFn");


// configuring dotenv in main file
dotenv.config();

app.use(express.json());
app.use(cookie());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// PORT
const PORT = 8080

// Db and server
connectToDb()
  .then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
    })
});


// ROUTES>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// test Route >>>>>>>>>>>>>>>>>>>>>
app.get("/", (req, res) => {
    res.send("Hello there Test route is running Successfully")
});

//AUTH-ROUTES >>>>>>>>>>>>>>>>>>>>>>>>>>
app.use("/Assignment/auth", authRouter);

// TASK-ROUTES >>>>>>>>>>>>>>>>>>>>>>>>>
app.use("/Assignment/task", authFn, taskRouter);