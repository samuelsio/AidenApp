require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const clanRoutes = require("./routes/clanRoutes");
const squadRoutes = require("./routes/squadRoutes");
const cors = require('cors');
const app = express();

const allowedOrigins = ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:3011', 'http://localhost:5173'];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);  // Allow the request
        } else {
            callback(new Error('Not allowed by CORS'));  // Reject the request
        }
    },
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
