const mongoose = require("mongoose");
const app = require("./app");

const DB = "mongodb://127.0.0.1:27017/todo";

mongoose.set("strictQuery", true);

mongoose.connect(DB).then(() => {
  console.log("DB connection successful!");
});

const port = 5000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
