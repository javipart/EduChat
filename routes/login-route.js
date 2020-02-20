const express = require('express');
const User = require('../models/User.js');

const router = express.Router();

router.post('/', async (req, res) => {
    const { email, password } = req.body;
    let data;
    await User.find()
        .then((users) => {
            users.forEach((user) => {
                if(user.email === email && user.password === password) {
                    data = {
                        status: 'ok',
                        id: user._id,
                        user,
                    };
                }
                res.send(data);
            });
        })
        .catch((err) => {
            data = {
                status: 'error',
                error: err,
            };
            res.send(data);
        });
});

module.exports = router;