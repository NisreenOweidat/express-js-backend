/**
 * in this file we create all the auth routes that are related to login and signup.
 * and generate token for authenticated users, after they verify for example their email
 *  after log in for the first time. 
 */

const express = require("express");

// for generating token
const jwt = require("jsonwebtoken");

// for encrypting password
const bcrypt = require("bcryptjs"); 

//create seperated paths from app.js
const router = express.Router();

// get the secret key from .env
require("dotenv").config();

// store users data insteade of database.
const users = []; 

// for security uses we save the secret key in env file.
const SECRET_KEY = process.env.SECRET_KEY;


/**
 * This function is for creating new user,
 * it accept username and password from req.body and save it in users array if they are not exist,
 * ,it encrypt password and return success message if it works, else return error message as json,
 * dose not create token ,because the main idea of the signup is to create new user. not to login into the system,
 * so there is no need to create token, until the user login manually later.
 * because the user should virefy for example its email after creating account before login.
 */
router.post("/signup", async (req, res) => {
    const { username, password } = req.body;

    //look for existing username.
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    //save username, password in users array
    users.push({ username, password: hashedPassword });

    res.status(201).json({ message: "User registered successfully" });
});

//***************************************/


/**
 * This function is for login user, 
 * it check if user exists and password is correct,
 * if it is correct then create token and return it to user.
 * dose not save token, because it`s signed with secret key,
 * we decode it-(token) later in middleware ,using the secret key.
 */


router.post("/login", async (req, res) => { 

    //destructuring username and password from req.body
    const { username, password } = req.body;

    //look for existing username in users array in line 15.
    const user = users.find(user => user.username === username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
        // if user not found or password is incorrect
        return res.status(401).json({ error: "username or password is incorrect" });
    }

    // if user found and password is correct then create token and sign it whith the secret key.
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });

    // return token to user as json.
    res.json({ token });
});

module.exports = router;
