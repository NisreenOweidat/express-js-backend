

const jwt = require("jsonwebtoken");

const SECRET_KEY = "nisreen`s token"; 


exports.authenticateUser = (req, res, next) => {
    const token = req.header("Authorization"); // Get the token from the request header 

    if (!token) {
        return res.status(403).json({ error: "Access denied" });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), SECRET_KEY); // splite the token from Bearer
        req.user = decoded; 
        next();
    } catch (err) {
        res.status(401).json({ error: "Invalid token" });
    }
};
