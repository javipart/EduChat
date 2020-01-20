const express = require('express');
const User = require('../models/User.js');

const router = express.Router();

router.post('/', (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    User.find()
        .then((users) => {
            users.forEach((user) => {
                console.log(user);
                if(user.email === email && user.password === password) {
                    res.send({
                        status: 'ok',
                        id: user._id,
                    });
                }
                else {
                    res.status(422).send({
                        status: 'Invalid Password'
                    })
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