const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.post('/create', async (req, res) => {
    await User.create(req.bodu).then((user) => {
        res.send({
            status: 'pk',
            id: user[0]._id,
        })
    })
    .catch((err) => {
        res.status(422).send({
            status: 'error',
            error: err,
        })
    })
});

router.get('/student', (req, res) => {
    let data = null;
    User.find({ "typeUser": 'student' }).then((result) => {
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
    User.find({ "typeUser": 'teacher' }).then((result) => {
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