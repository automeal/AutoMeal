const express = require("express");
const mongoose = require("mongoose");

const app = express();
const recipes = require("./routes/api/recipes");

// Extract our URI
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));

// Body parser middleware
app.use(express.json());
app.use("/api/recipes", recipes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server is up and running on port: ${PORT}`)
);
