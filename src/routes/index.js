const { Router } = require('express');
const router = Router();

const User = require('../models/User');

const jwt = require('jsonwebtoken');

router.get('/', (req, res) => res.send('Hello World'))

router.post('/signup', async (req, res) => {
    const { email, password, username, userlastname, rol, direccion  } = req.body;
    const newUser = new User({ email: email, password: password, username: username, userlastname: userlastname, rol: rol, direccion: direccion });
    await newUser.save();
    const token = jwt.sign({_id: newUser._id }, 'secretkey')
    res.status(200).json({ token })
})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email: email})
    if (!user) return res.status(401).send('Este correo no existe');
    if (user.password !== password) return res.status(401).send('Contraseña incorrecta');
    const token = jwt.sign({_id: User._id }, 'secretkey')
    console.log(user)
    return res.status(200).json({token,user});
})

router.get('/tasks', (req, res) => {
    res.json([
        {
            _id: 1,
            name: 'Ingreso al sistema',
            description: 'Aquí deberás ingresar al sitema con tu correo y contraseña, si no tienes una cuenta deberás registrarte.',
            date: "2022-10-29T23:44:47.429Z"
        },
        {
            _id: 2,
            name: 'Creación de cuenta',
            description: '¿No tienes cuenta? No hay problema, ingresarás un correo, añaderás una contraseña, Agregará tu(s) nombre(s) y apellido(s) y darás en registrarte).',
            date: "2022-10-29T23:44:47.429Z"
        },
        {
            _id: 3,
            name: 'Validaciones de contraseña',
            description: 'Agregarás una contraseña con las siguientes especificaciones: 1.- Longitud mínima de 8 caracteres, 2.- Utilizar mínimo una mayúscula, 3.- Utilizar mínimo una minúscula, 4.- Utilizar mínimo un carácter especial (que no sea letra ni número), 5.- No permitir números consecutivos, 6.- No permitir letras consecutivas (con respecto al abecedario).',
            date: "2022-10-29T23:44:47.429Z"
        },
        {
            _id: 4,
            name: 'Todo listo',
            description: 'Ya podrás ingresar al sistema. (AVISO: RECUERDA RECARGAR LA PAGINA PARA QUE TE DE LAS OPCIONES DE UN USUARIO REGISTRADO O HAGAS CUALQUIER CAMBIO).',
            date: "2022-10-29T23:44:47.429Z"
        },
        {
            _id: 5,
            name: 'Dudas/sugerencias',
            description: 'Cualquier duda o sugerencia deberás marcar a soporte dirigido por nuestro staff: 449 110 9105.',
            date: "2022-10-29T23:44:47.429Z"
        }
    ])
})

router.get('/private-tasks', verifyToken, (req, res) => {
    res.json([
        {
            _id: 1,
            name: 'Bienvenido al sistema usuario registrado',
            description: '¡Nos alegra que esté aquí de nuevo o así sea la primera vez que nos visitas!',
            date: "2022-10-29T23:44:47.429Z"
        },
        {
            _id: 2,
            name: 'Usuario con rol: empleado',
            description: 'Un nuevo usuario siempre estará registrado con este rol, por lo que si deseas hacer tu usuario a rol "Admin" deberaás seguir el siguiente paso.',
            date: "2022-10-29T23:44:47.429Z"
        },
        {
            _id: 3,
            name: '¿Quieres ser Admin?, sigue las siguientes instrucciones',
            description: 'Deberás ingresar como este usuario ya predeterminado al sistema: Email: "Admin@gmail.com" Password: "Admin1$", para poder así editar tu usuario y puedas cambiar el rol a "Admin".',
            date: "2022-10-29T23:44:47.429Z"
        },
        {
            _id: 4,
            name: 'Usuario con rol: Admin',
            description: 'Si eres usuario con rol: Admin, ¡felicidades! nos alegra comunicarte que eres Administrador y tendrás acceso a: Crear, Leer, Actualizar y Eliminar usuarios y algunas otras funciones.',
            date: "2022-10-29T23:44:47.429Z"
        },
        {
            _id: 5,
            name: 'Actividades de usuarios',
            description: 'Deberás primero agregar un usuario para poder así asignar la actividad correspondiente ya sea a ti mismo o a otro.',
            date: "2022-10-29T23:44:47.429Z"
        },
        {
            _id: 6,
            name: 'Todo listo',
            description: '¡Eres un nuevo mienbro de nuestra familia IBM!',
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