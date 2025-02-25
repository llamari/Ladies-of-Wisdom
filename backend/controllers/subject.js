const subject = require('../models/subjects')

const GetSubjects = async (req, res) => {
    try {
        const subjects = await subject.find();
        res.json(subjects);
    } catch (error) {
        console.error("Erro ao buscar matérias: ", error);
    }
}

module.exports = { GetSubjects };