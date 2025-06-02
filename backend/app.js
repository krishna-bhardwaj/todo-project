const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const taskRouter = require("./routes/taskRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/healthz", (req, res) => {
  res.send("ok");
});

const apiV1Router = express.Router();
apiV1Router.use(userRouter);
apiV1Router.use(taskRouter);

app.use("/api/v1", apiV1Router);

app.use((err, _, res, __) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

module.exports = app;
