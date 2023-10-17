const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const connectDB = () => {
  const DB = process.env.DB;
  console.log(DB);
  mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("connection successful");
    })
    .catch((e) => {
      console.log(e);
    });
};

module.exports = connectDB;
