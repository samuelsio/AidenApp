require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const clanRoutes = require("./routes/clanRoutes")
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// User routes
app.use("/users", userRoutes);
app.use("/clans", clanRoutes);

// Default route for checking API health
app.get("/", (req, res) => {
    res.send("API is running...");
});

module.exports = app;
