const express = require('express')
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
require('dotenv').config()


const JWT_SECRET = process.env.JWT_SECRET;


// Route to create a new user
router.post('/create-user',
    [
        body('name', 'Enter a valid name').isLength({ min: 3 }),
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Password must be at least 6 characters').isLength({ min: 6 })
    ],
    async (req, res) => {
        let success = false;

        // If there are errors, return them
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            // Check if the user already exists
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({success, error: "User with this email already exists" });
            }

            // Password hashing
            const salt = await bcrypt.genSalt(10);
            const secretPassword = await bcrypt.hash(req.body.password, salt);

            // Create a new user
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secretPassword
            });

            // Create a JWT token
            const data = {
                user: {
                    id: user.id
                }
            };

            const authToken = jwt.sign(data, JWT_SECRET);
            success = true;
            res.json({ success,authToken });


        } catch (error) {
            console.error(error.message);
            return res.status(500).send(success,"Internal Server Error");
        }
    });


    // Route to login a new user
router.post('/login-user',
    [
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Password must be at least 6 characters').isLength({ min: 6 })
    ],
    async (req, res) => {
        let success = false;

        // If there are errors, return them
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }

        try {
             const {email, password} = req.body;

            // Check if the user exists
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ success, error: "Please try to login with correct credentials" });
            }

            // Password comaring
            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(400).json({ success, error: "Please try to login with correct credentials" });
            }

            // Create a JWT token
            const data = {
                user: {
                    id: user.id
                }
            };

            const authToken = jwt.sign(data, JWT_SECRET);
            success = true;
            res.json({ success, authToken });


        } catch (error) {
            console.error(error.message);
            return res.status(500).send(success, "Internal Server Error");
        }
    });

// Route to get user details
router.post('/get-user', fetchuser, async (req, res) => {
        try {
            let success = false;
            let userId = req.user.id;
            const user = await User.findById(userId).select("-password");
            success = true;
            res.send({success,user});
        } catch (error) {
            console.error(error.message);
            return res.status(500).send(success,"Internal Server Error");
        }
    });

module.exports = router;