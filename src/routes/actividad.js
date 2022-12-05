const express = require('express');
const router = express.Router();
const actividadController = require('../controllers/actvidadController');

router.post('/newuser', actividadController.crearActividad);
router.get('/getuser', actividadController.obtenerActividades);
router.put('/:id', actividadController.actualizarActividad);
router.get('/:id', actividadController.obtenerActividad);
router.delete('/:id', actividadController.eliminarActividad);

module.exports = router;