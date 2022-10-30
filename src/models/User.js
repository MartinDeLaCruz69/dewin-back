const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: String,
    password: String,
    username: String,
    userlastname: String,
},
{
    timestamps: true
})

module.exports = model('User', userSchema);