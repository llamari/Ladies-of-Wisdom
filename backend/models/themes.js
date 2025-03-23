const mongoose = require('mongoose');

const ThemeSchema = new mongoose.Schema({
    title: String,
    texts: String
}, {collection: 'Themes'})

module.exports = mongoose.model('Theme', ThemeSchema);