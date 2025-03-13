const express = require("express");
const jwt = require("jsonwebtoken"); // for generating token
const bcrypt = require("bcryptjs"); // for encrypting password

const router = express.Router();

const users = [];

const SECRET_KEY = "your_secret_key";

router.post("/signup", async (req, res) => { // create new user
    const { username, password } = req.body;


    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });

    res.status(201).json({ message: "User registered successfully" });
});


router.post("/login", async (req, res) => { // normal login 
    const { username, password } = req.body;
    const user = users.find(user => user.username === username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: "Invalid credentials" });
    }


    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token });
});

module.exports = router;
