const express = require('express');
const Grade = require('../models/Grade');

const router = express.Router();

router.post('/', async (req, res) => {
    await Grade.create(req.body)
        .then((grade) => {
            res.send({
                status: 'ok',
                data: grade[0]._id,
            });
        })
        .catch((error) => {
            res.send({
                status: 'error',
                data: error,
            });
        });
});

module.exports = router;