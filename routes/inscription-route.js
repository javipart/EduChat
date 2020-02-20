const express = require('express');
const Inscription = require('../models/Inscription');
const User = require('../models/User');

const router = express.Router();

const getUser = (id) => {
    User.findById(id).then((student) => {
        return student;
    }).catch((err) => {
        return err;
    })
}

router.post('/', async (req, res) => {
    const { idStudent, idGroup } = req.body;
    await Inscription.find()
        .then(async (inscriptions) => {
            if (inscriptions.length === 0) {
                await Inscription.create(req.body).then(() => {
                    res.send({
                        status: 'ok',
                    });
                })
            }
            else {
                inscriptions.forEach((inscription) => {
                    if (inscription.idStudent.toString() === idStudent.toString() && inscription.idGroup.toString() === idGroup.toString()) {
                        data = {
                            status: 'ok',
                            message: 'Ya se realizó la inscripción',
                        };
                    }
                    else {
                        data = {
                            status: 'ok',
                            message: 'Incripción realizada',
                        };
                    }
                    res.send(data);
                });
            }
        })
        .catch((err) => {
            data = {
                status: 'error',
                error: err,
            };
            res.send(data);
        });
});

router.get('/', async (req, res) => {
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