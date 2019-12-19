const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    // Get token from header
    const token = req.headers["x-access-token"] || req.headers["authorization"];

    // If token not found
    if (!token) return res.status(401).send("Access denied. No token provided.");

    try {
        // If token is valid
        req.user = jwt.verify(token, config.get("private_key"));
        next();
    } catch (err) {
        // If token is invalid
        res.status(400).send("Invalid token.")
    }
};