const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.post('/newuser', usuarioController.crearUsuario);
router.get('/getuser', usuarioController.obtenerUsuarios);
router.put('/:id', usuarioController.actualizarUsuario);
router.get('/:id', usuarioController.obtenerUsuario);
router.delete('/:id', usuarioController.eliminarUsuario);

module.exports = router;