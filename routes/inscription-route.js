const express = require('express');
const Inscription = require('../models/Inscription');
const User = require('../models/User');
const router = express.Router();
const mongoose = require('mongoose');

const validateUser = async (userToCreate, inscriptions, idGroup, nameGroup) => {
    await User.find().then(async (users) => {
        users.forEach(async (user) => {
            await userToCreate.forEach(async usr => {
                if (user.email === usr.email
                    && user.document === usr.document
                    && user.code === usr.code) {
                    inscriptions.push({ idStudent: user._id, idGroup, idInscription: `${user.code}${nameGroup}` });
                }
            });
        });
    });
};

router.post('/upload', async (req, res) => {
    const { file } = req.files;
    const { idGroup, nameGroup } = req.body;
    const path = `${__dirname}/../files/${file.name}`;
    let msgFile = '';
    file.mv(path, (err) => {
        if (err) msgFile = err.errmsg;
        msgFile = 'File Upload';
    });
    const readLine = require('readline'),
        fs = require('fs');

    const reader = readLine.createInterface({
        input: fs.createReadStream(path)
    });
    let users = [];
    let inscriptions = [];
    let msgUser = '';
    const usersFile = new Promise(async (resReader, errReader) => {
        reader.on("line", line => {
            const fields = line.split(';')
            const user = {
                email: fields[0],
                name: fields[1],
                document: fields[2],
                code: fields[3],
                password: fields[4],
                typeUser: 'student',
            };
            users.push(user);
            resReader(users);
        });
    });
    await usersFile.then(async (respFile) => {
        await validateUser(respFile, inscriptions, idGroup, nameGroup);
        await User.create(respFile).then(resUC => {
            resUC.map((uc) => {
                inscriptions.push({ idStudent: uc._id, idGroup, idInscription: `${uc.code}${nameGroup}` });
            });
            msgUser = 'ok';
        }).catch((err) => {
            msgUser = err;
        });
    });

    await Inscription.create(inscriptions).then((resIns) => {
        res.send({
            status: 'ok',
            msgFile,
            inscriptions: resIns,
            msgUser,
        });
    }).catch((err) => {
        res.send({
            status: 'error',
            error: err.errmsg,
            msgUser,
        });
    })
});

router.get('/', async (req, res) => {
    Inscription.find()
        .then((inscriptions) => {
            res.send({
                status: 'ok',
                inscriptions,
            });
        });
});

router.get('/:id', async (req, res) => {
    const idStudent = mongoose.Types.ObjectId(req.params.id);
    let data;
    await Inscription.find({ "idStudent": idStudent })
        .populate({
            path: 'idGroup',
            populate: {
                path: 'idSuject',
            },
        })
        .exec()
        .then((inscriptions) => {
            data = {
                status: 'ok',
                inscriptions,
            }
        })
        .catch((err) => {
            data = {
                status: 'error',
                error: err.errmsg,
            }
        });
    res.send(data);
});

module.exports = router;