const { Schema, model } = require('mongoose');

const activitySchema = new Schema({
    nombreactividad: String,
    descripcionactividad: String,
    username: String,
    userlastname: String,
    rol: String,
    fecha: String
},
{
    timestamps: true
})

module.exports = model('Activity', activitySchema);