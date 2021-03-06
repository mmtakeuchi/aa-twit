const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./config/keys_dev").mongoURI;
const passport = require("passport");
const path = require("path");

const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");

const port = process.env.PORT || 5000;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log(err));

app.use(passport.initialize());
require("./config/passport")(passport);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}
app.use("/api/users", users);
app.use("/api/tweets", tweets);

app.listen(port, () => console.log(`Server is running on port ${port}`));
