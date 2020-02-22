const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.post('/create', async (req, res) => {
    const { code } = req.body;
    console.log('Ingresa')
    await User.find((users) => {
        console.log(users);
        users.forEach(async (user) => {
            if (user.code !== code) {
                await User.create(req.bodu).then(
                    res.send({
                        status: 'pk',
                    })
                )
            }
            else {
                res.status(422).send({
                    status: 'error'
                })
            }
        });
    });
});

router.get('/student', (req, res) => {
    let data = null;
    User.find( { "typeUser": 'student' } ).then((result) => {
        data = {
            result,
            status: 'ok',
        };
        res.send(data);
    }).catch((err) => {
        data = {
            err,
            status: 'error',
        };
        res.send(data);
    });
});

router.get('/teacher', (req, res) => {
    let data = null;
    User.find( { "typeUser": 'teacher' } ).then((result) => {
        data = {
            result,
            status: 'ok',
        };
        res.send(data);
    }).catch((err) => {
        data = {
            err,
            status: 'error',
        };
        res.send(data);
    });
});

module.exports = router;