try {
  require("dotenv").config();
} catch (e) {
  // In production environments (like Render), environment variables are injected directly into process.env
}

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI || "mongodb://localhost:27017/bookify";

// Connecting MongoDB Database
if (MONGO_URI) {
  mongoose.connect(MONGO_URI)
    .then(() => console.log("MongoDB is Connected!"))
    .catch((err) => console.error("MongoDB connection error:", err.message));
}

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// Setting up EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "Views"));
app.use(express.static(path.join(__dirname, "Public")));

// Routes
app.get("/", (req, res) => {
  return res.render("home");
});

// Health check endpoint for deployment monitoring
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// Listening Up PORT
app.listen(PORT, () => console.log(`Server Started on PORT ${PORT}`));
