const mongoose = require('mongoose');

const docs = new mongoose.Schema({
    title: String,
    link: String
})

const taskSchema = new mongoose.Schema({
    title: String,
    documents: [docs],
    subject: String
}, {collection: 'Tasks'})

module.exports = mongoose.model('Task', taskSchema);