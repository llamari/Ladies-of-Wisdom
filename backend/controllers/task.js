const tasks = require('../models/tasks');

const CreateTask = async (req, res) => {
    try {
        const { title, link, name, id } = req.body;

        if (!Array.isArray(link) || !Array.isArray(name) || link.length !== name.length) {
            return res.status(400).json({ error: "Link e name devem ser arrays de mesmo tamanho." });
        }

        const documents = name.map((title, index) => ({
            title: title,
            link: link[index]
        }));

        const newTask = new tasks({
            title: title,
            documents: documents,
            subject: id
        });

        await newTask.save();
        res.status(201).json(newTask);
    } catch (err) {
        console.error('Erro ao criar task: ', err);
        res.status(500).json({ error: "Erro interno ao criar a task." });
    }
};

const GetTask = async (req, res) => {
    try {
        const { id } = req.params; // Pegando o ID corretamente da URL

        if (!id) {
            return res.status(400).json({ error: "ID do assunto não fornecido." });
        }

        const topics = await tasks.find({ subject: id });

        console.log("Tasks encontradas:", topics);

        if (topics.length === 0) {
            return res.json({ message: "Nenhuma tarefa encontrada para este assunto." });
        }

        res.json(topics);
    } catch (error) {
        console.error('Erro ao buscar task: ', error);
        res.status(500).json({ error: "Erro interno ao buscar a task." });
    }
};

module.exports = {CreateTask, GetTask}