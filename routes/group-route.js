const express = require('express');
const Group = require('../models/Group');

const router = express.Router();

router.post('/create', async (req, res) => {
    await Group.create(req.body);
    await Group.find({ "name": req.body.name })
        .then((group) => {
            res.send({
                status: 'ok',
                id: group[0]._id,
            });
        })
        .catch(err => {
            res.send({
                status: 'error',
                error: err,
            })
        })
});

router.get('/', async (req, res) => {
    await Group.find()
        .populate('Subject')
        .exec()
        .then((groups) => {
            res.send(groups);
        });
})

module.exports = router;