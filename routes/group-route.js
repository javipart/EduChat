const express = require('express');
const Group = require('../models/Group');

const router = express.Router();

router.post('/create', async (req, res) => {
    await Group.create(req.body)
        .then((group) => {
            res.send({
                status: 'ok',
                id: group._id,
            });
        })
        .catch(err => {
            res.send({
                status: 'error',
                error: err.errmsg,
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
});

router.get('/:id', async (req, res) => {
    const idTeacher = req.params.id;
    await Group.find({ "idTeacher": idTeacher })
        .populate('idSubject')
        .populate('idTeacher')
        .exec()
        .then((groups) => {
            res.send(groups);
        });
});

module.exports = router;