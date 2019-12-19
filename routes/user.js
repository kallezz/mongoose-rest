const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Bcrypt = require('bcrypt');

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

// POST new user
router.post('/', async (req, res) => {
    try {
        req.body.password = await Bcrypt.hash(req.body.password, 10);
        const user = new User(req.body);

        const savedUser = await user.save();
        res.status(200).json({
            "message": "New user added",
            "data": savedUser
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