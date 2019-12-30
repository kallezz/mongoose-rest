const express = require('express');
const router = express.Router();
const Bcrypt = require('bcrypt');
const auth = require('../middleware/auth');
const { User, validate } = require('../models/User');

// GET all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            "users": users
        })
    } catch(err) {
        res.status(500).json({
            "message": err.message
        })
    }
});

// GET user by id
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({
            "user": user
        })
    } catch(err) {
        res.status(404).json({
            "message": err.message
        })
    }
});

// GET current user
router.get('/current', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");
    res.send(user);
});

// POST register new user
router.post('/register', async (req, res) => {
    try {
        req.body.password = await Bcrypt.hash(req.body.password, 10);
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        const savedUser = await user.save();
        const token = user.generateAuthToken();
        res.header("x-auth-token", token).status(200).json({
            "message": "New user added",
            "data": savedUser
        })
    } catch(err) {
        res.status(500).json({
            "message": err.message
        })
    }
});

// TODO: Proper response
// POST login user
router.post('/login', async (req, res) => {
    try {
        let user = await User.findOne({
            username: req.body.username
        })
            .exec();

        if (!user) {
            return res.status(404).json({
                "message": "User not found"
            })
        }
        if (!Bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(400).json({
                "message": "Password is invalid"
            })
        }

        res.status(200).json({
            "message": "Login successful"
        })
    } catch(err) {
        res.status(500).json({
            "message": err.message
        })
    }
});

/* TODO: PATCH user by id
router.patch('/:id', async (req, res) => {
    try {
        const updatedUser = await User.updateOne({
            _id: req.params.id
        }, {
            $set: {
                title: req.body.title
            }
        });
        res.status(200).json({
            "message": `Post ${req.params.id} updated`,
            "data": updatedUser
        })
    } catch(err) {
        res.status(500).json({
            "message": err.message
        })
    }
});
*/

// DELETE user by id
router.delete('/:id', async (req, res) => {
    try {
        const removedUser = await User.deleteOne({
            _id: req.params.id
        });
        res.status(200).json({
            "message": `User ${req.params.id} removed`,
            "data": removedUser
        })
    } catch(err) {
        res.status(500).json({
            "message": err.message
        })
    }
});


module.exports = router;