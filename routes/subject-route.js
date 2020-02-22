const express = require('express');
const Subject = require('../models/Subject');

const router = express.Router();

router.post('/create', async (req, res) => {
    await Subject.create(req.body)
        .then((subject) => {
            res.send({
                status: 'ok',
                id: subject[0]._id,
            });
        })
        .catch((err) => {
            res.send({
                status: 'error',
                error: err,
            })
        })
});

router.get('/', async (req, res) => {
    await Subject.find()
        .then((subjects) => {
            res.send(subjects);
        });
});

module.exports = router;