const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    master: {
        type: Boolean,
        required: true
    },
    deleted: {
        type: Boolean,
        required: true
    }
}, {collection: 'Users'})

module.exports = mongoose.model('User', userSchema);