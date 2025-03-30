const mongoose = require('mongoose');

const essaySchema = new mongoose.Schema({
    theme: String,
    essay: String, // redação em si
    writer: String, //id da escritora
    grade: Number, //nota
    correction: String, // correção
}, {collection: 'Essays'})

module.exports = mongoose.model('Essays', essaySchema);