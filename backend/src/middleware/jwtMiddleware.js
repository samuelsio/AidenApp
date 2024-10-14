// jwtMiddleware.js
const jwt = require("jsonwebtoken");
require('dotenv').config(); 

const SECRET_KEY = process.env.JWT_SECRET; 

exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Expecting format: "Bearer TOKEN"

    if (!token) {
        return res.status(403).json({ error: "Token is required for authentication" });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; // Add decoded token data to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};
