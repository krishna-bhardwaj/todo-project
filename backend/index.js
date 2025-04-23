const mongoose = require("mongoose");

const app = require("./app");

const DB =
  "mongodb://127.0.0.1:27017/todo";

mongoose.set("strictQuery", true);

mongoose.connect(DB).then((con) => {
  console.log("DB connection successful!");
});

const port = 8000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
