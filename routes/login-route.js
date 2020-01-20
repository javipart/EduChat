const express = require('express');
const User = require('../models/User.js');

const router = express.Router();

router.post('/', async (req, res) => {
    const { email, password } = req.body;
    await User.find()
        .then((users) => {
            users.forEach((user) => {
                if(user.email === email && user.password === password) {
                    res.send({
                        status: 'ok',
                        id: user._id,
                    });
                }
            });
        })
        .catch((err) => {
            res.send({
                status: 'error',
                error: err,
            });
        });
});

module.exports = router;