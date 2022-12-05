const Actividad = require("../models/Activity");

exports.crearActividad = async (req, res) => {

    try {
        let actividad;

        // Creamos nuestro actividad
        actividad = new Actividad(req.body);

        await actividad.save();
        res.send(actividad);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerActividades = async (req, res) => {

    try {

        const actividades = await Actividad.find();
        res.json(actividades)

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.actualizarActividad = async (req, res) => {

    try {
        const { nombreactividad, descripcionactividad, username, userlastname, rol, fecha } = req.body;
        let actividad = await Actividad.findById(req.params.id);

        if(!actividad) {
            res.status(404).json({ msg: 'No existe la actividad' })
        }

        actividad.nombreactividad = nombreactividad;
        actividad.descripcionactividad = descripcionactividad;
        actividad.username = username;
        actividad.userlastname = userlastname;
        actividad.rol = rol;
        actividad.fecha = fecha;

        actividad = await Actividad.findOneAndUpdate({ _id: req.params.id },actividad, { new: true} )
        res.json(actividad);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}


exports.obtenerActividad = async (req, res) => {

    try {
        let actividad = await Actividad.findById(req.params.id);

        if(!actividad) {
            res.status(404).json({ msg: 'No existe la actividad' })
        }

        res.json(actividad);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.eliminarActividad = async (req, res) => {

    try {
        let actividad = await Actividad.findById(req.params.id);

        if(!actividad) {
            res.status(404).json({ msg: 'No existe la actividad' })
        }

        await Actividad.findOneAndRemove({ _id: req.params.id })
        res.json({ msg: 'Actividad eliminada con exito' });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}