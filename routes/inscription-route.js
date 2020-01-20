const express = require('express');
const Inscription = require('../models/Inscription');

const router = express.Router();

router.post('/', async (req, res) => {
    await Inscription.create(req.body);
    Inscription.find({ "id": req.body.id })
        .then((inscription) => {
            res.send({
                status: 'ok',
                id: inscription[0]._id,
            });
        });
});

module.exports = router;