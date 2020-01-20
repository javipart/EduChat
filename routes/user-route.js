const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.post('/create', async (req, res) => {
    await User.create(req.body)
        .then(() => {
            res.send({
                status: 'ok',
            })
        });
});

router.get('/', (req, res) => {
    const { id } = req.body;
    console.log(id);
    User.findById(id)
        .then((user) => {
            res.send({
                name: user.name,
                email: user.email,
                document: user.document,
                code: user.code,
                typeUser: user.typeUser,
            })
        })
        .catch((err) => {
            res.send({
                status: 'error',
                error: err,
            })
        });
})

module.exports = router;