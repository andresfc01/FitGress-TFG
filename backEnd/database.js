const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.set("strictQuery", true);
mongoose
  .connect(MONGODB_URI, {
    useUnifiedTopology: true,
  })
  .then((db) => console.log("Database Connected"))
  .catch((err) => console.log(err));