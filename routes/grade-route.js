const express = require('express');
const Grade = require('../models/Grade');

const router = express.Router();

router.post('/', async (req, res) => {
    await Grade.create(req.body);
    Grade.find({ "id": req.body.id })
        .then((grade) => {
            res.send({
                status: 'ok',
                id: grade[0]._id,
            });
        });
});

module.exports = router;