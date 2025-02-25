const mongoose = require("mongoose")

const subjectSchema = new mongoose.Schema({
    name: {
        type: String
    },
    image: {
        type: String
    },
    id: {
        type: String
    }
}, {collection: 'Subjects'})

module.exports = mongoose.model('Subject', subjectSchema);