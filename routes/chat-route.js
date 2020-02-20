const express = require('express');
const Chat = require('../models/Chat');

const router = express.Router();

router.post('/', async (req, res) => {
    Chat.create(req.body).then(() => {
        res.send({
            status: 'ok',
        });
    }).catch((err) => {
        res.send({
            status: 'error',
        });
    });
});

router.get('/:id', async (req, res) => {
    const idGroup = req.params.id;
    Chat.find( { "idGroup": idGroup } ).then((chats) => {
        res.send(chats);
    })
});

module.exports = router;