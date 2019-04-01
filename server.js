const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const path = require("path");
const app = express();
const recipes = require("./routes/api/recipes");
const users = require("./routes/api/users");
const auth = require("./routes/api/auth");
const deleteUser = require("./routes/api/deleteUser");
// Bodyparser Middleware
app.use(express.json());

// Exract our URI
const db = config.get("mongoURI");

// Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));

// Body parser middleware
app.use(express.json());

app.use("/api/recipes", recipes);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/deleteUser", deleteUser);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server is up and running on port: ${PORT}`)
);
