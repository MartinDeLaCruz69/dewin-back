const { Router } = require('express');
const router = Router();

const User = require('../models/User');

const jwt = require('jsonwebtoken');

router.get('/', (req, res) => res.send('Hello World'))

router.post('/signup', async (req, res) => {
    const { email, password, username, userlastname } = req.body;
    const newUser = new User({ email: email, password: password, username: username, userlastname: userlastname });
    await newUser.save();
    const token = jwt.sign({_id: newUser._id }, 'secretkey')
    res.status(200).json({token})
})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email: email})
    if (!user) return res.status(401).send('Este correo no existe');
    if (user.password !== password) return res.status(401).send('Contraseña incorrecta');
    const token = jwt.sign({_id: User._id }, 'secretkey')
    return res.status(200).json({token});
})

router.get('/tasks', (req, res) => {
    res.json([
        {
            _id: 1,
            name: 'Task one',
            description: 'lorem ipsum',
            date: "2022-10-29T23:44:47.429Z"
        },
        {
            _id: 2,
            name: 'Task two',
            description: 'lorem ipsum',
            date: "2022-10-29T23:44:47.429Z"
        },
        {
            _id: 3,
            name: 'Task three',
            description: 'lorem ipsum',
            date: "2022-10-29T23:44:47.429Z"
        }
    ])
})

router.get('/private-tasks', verifyToken, (req, res) => {
    res.json([
        {
            _id: 1,
            name: 'Task one',
            description: 'lorem ipsum',
            date: "2022-10-29T23:44:47.429Z"
        },
        {
            _id: 2,
            name: 'Task two',
            description: 'lorem ipsum',
            date: "2022-10-29T23:44:47.429Z"
        },
        {
            _id: 3,
            name: 'Task three',
            description: 'lorem ipsum',
            date: "2022-10-29T23:44:47.429Z"
        }
    ])
})

router.get('/profile', verifyToken, (req, res) => {
    res.send(req.userId);
})

module.exports = router;

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('anUthorize Request');
    }
    const token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send('Unathorize Request');
    }
    const payload = jwt.verify(token, 'secretkey')
    req.userId = payload._id;
    next();
}