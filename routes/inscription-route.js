const express = require('express');
const Inscription = require('../models/Inscription');
const User = require('../models/User');
const fs = require('fs');
const router = express.Router();

router.post('/upload',(req,res) => {
    const EDFile = req.files.file;
    EDFile.mv(`./filesUpload/${EDFile.name}`,err => {
        if(err) return res.status(500).send({ message : err })
        return res.status(200).send({ message : 'File upload' })
    })
    fs.readFile(`./filesUpload/${EDFile.name}`, (err, data) => {
        if (err) throw err;
        console.log(data);
    })
});

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

router.get('/:id', async (req, res) => {
    const idStudent = req.params.id;
    let data;
    await Inscription.find( { "idStudent": idStudent } )
        .then((inscriptions) => {
            data = {
                status: 'ok',
                inscriptions,
            }
        })
        .catch((err) => {
            data = {
                status: 'error',
                err,
            }
        });
        res.send(data);
});

module.exports = router;