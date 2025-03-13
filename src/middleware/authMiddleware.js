
/**
 * This middleware will check if the user is authenticated or not.
 * if it is authenticated then it will put the user data in req.user
 * and it will call the next middleware.
 * if it is not authenticated then it will return error.
 * 
 * How the midddleware comunicates with the controller: 
 * 1- when the request comes to the middleware, the client sent the token in the header,
 * 2- this auth middleware will check the token and virify it.
 * 3- if the token is valid then we will call the next() to go to he controller.
 * 4- then the controller do its job.
 */


//create and check the token.
const jwt = require("jsonwebtoken");

require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;


// export authenticateUser middleware to the controllers
exports.authenticateUser = (req, res, next) => {

    // Get the token from the request header.
    const token = req.header("Authorization"); 

    if (!token) {
        return res.status(403).json({ error: "Access denied" });
    }

    try {
        // split the token and get the payload
        const decoded = jwt.verify(req.header("Authorization").split(" ")[1], SECRET_KEY);
       
       
        /**
         * req.user = decoded; ::
         * 
         * after we get the decoded payload from the token
         * we put it in req.user to know the user if it was authenticated or not,
         * this allows this middleware to sent the user data to the controllers.
         * (the user that we wanted to make sure he is authenticated).
         */
        req.user = decoded;
      
        // move to the next controller to do the job we called this middleware for;
        next();
    } catch (err) {
        res.status(401).json({ error: "Invalid token" });
    }
};
