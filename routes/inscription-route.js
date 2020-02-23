const express = require('express');
const Inscription = require('../models/Inscription');
const User = require('../models/User');
const router = express.Router();

const validateUser = async (userToCreate, inscriptions, idGroup, nameGroup) => {
    const resFi = await User.find().then(async (users) => {
        const usFE = users.forEach(async (user) => {
            const usTC = await userToCreate.forEach(async usr => {
                if (user.email === usr.email
                    && user.document === usr.document
                    && user.code === usr.code) {
                        inscriptions.push({ idStudent: user._id, idGroup, idInscription: `${user.code}${nameGroup}` });
                    }
            });
            return usTC;
        });
        return usFE;
    });
    console.log(resFi);
    return resFi;
};

router.post('/upload', async (req, res) => {
    const { file } = req.files;
    const { idGroup, nameGroup } = req.body;
    const path = `${__dirname}/../files/${file.name}`;
    let msgFile = '';
    let responses = [];
    let response = '';
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
    let idSt = '';
    let idG = '';
    let idIn = '';
    await usersFile.then(async (respFile) => {
        await validateUser(respFile, inscriptions, idGroup, nameGroup);
        await User.create(respFile).then(resUC => {
            resUC.map((uc) => {
                inscriptions.push({ idStudent: uc._id, idGroup, idInscription: `${uc.code}${nameGroup}` });
            })
        }).catch((err) => {
            res.send({
                status: 'error',
                error: err.errmsg,
            });
        });
    });

    await Inscription.create(inscriptions).then((resIns) => {
        res.send({
            status: 'ok',
            msgFile,
            inscriptions: resIns,
        });
    }).catch((err) => {
        res.send({
            status: 'error',
            error: err.errmsg,
        });
    })
});

router.get('/', async (req, res) => {
    await Inscription.create(req.body);
    Inscription.find({ "id": req.body.id })
        .then((inscription) => {
            res.send({
                status: 'ok',
                id: inscription._id,
            });
        });
});

router.get('/:id', async (req, res) => {
    const idStudent = req.params.id;
    let data;
    await Inscription.find({ "idStudent": idStudent })
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