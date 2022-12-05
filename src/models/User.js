const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: String,
    password: String,
    username: String,
    userlastname: String,
    rol: String,
    direccion: String,
},
{
    timestamps: true 
})

module.exports = model('User', userSchema);