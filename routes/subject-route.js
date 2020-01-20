const express = require('express');
const Subject = require('../models/Subject');

const router = express.Router();

router.post('/create', async (req, res) => {
    await Subject.create(req.body);
    Subject.find({ "id": req.body.id })
        .then((subject) => {
            res.send({
                status: 'ok',
                id: subject[0]._id,
            });
        });
});

module.exports = router;