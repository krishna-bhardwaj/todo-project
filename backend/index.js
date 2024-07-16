const mongoose = require("mongoose");

const app = require("./app");

const DB =
  "mongodb+srv://krishna24:v4bkmLXGMbSxVHSV@freecluster.pbeogwd.mongodb.net/todoDB?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);

mongoose.connect(DB).then((con) => {
  console.log("DB connection successful!");
});

const port = 5000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
