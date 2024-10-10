require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const clanRoutes = require("./routes/clanRoutes");
const squadRoutes = require("./routes/squadRoutes");
const cors = require('cors');
const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',  // Only allow requests from this origin
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],  // Allow specific HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'],  // Allow specific headers
  };

// Middleware to parse JSON bodies
app.use(cors(corsOptions));
app.use(bodyParser.json());

// User routes
app.use("/users", userRoutes);
app.use("/clans", clanRoutes);
app.use("/squad", squadRoutes)

// Default route for checking API health
app.get("/", (req, res) => {
    res.send("API is running...");
});

module.exports = app;
