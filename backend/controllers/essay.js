const jwt = require('jsonwebtoken');
const essays = require('../models/essays');
const users = require('../models/users');

const AddEssay = async (req, res) => {
    try {
        const { text, token, theme } = req.body;

        // Verificação do token
        const valid = jwt.verify(token, process.env.JWT_SECRET);
        if (!valid) {
            return res.status(401).json({ message: "Token inválido" });
        }

        // Verificação da existência do usuário
        const userExists = await users.findById(valid.id);
        if (!userExists) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        // Criação da nova redação
        const newEssay = new essays({
            theme: theme,
            essay: text, // Redação em si
            writer: valid.id, // ID da escritora
            grade: null, // Nota
            correction: null, // Correção
        });

        await newEssay.save();

        res.status(201).json({ message: "Redação salva com sucesso!", essay: newEssay });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao salvar a redação" });
    }
};

const GetYourEssays = async (req, res) => {
    try {
        const token = req.header('Authorization')?.split(' ')[1]; 
        if (!token) {
            return res.status(401).json({ error: "Token não fornecido" });
        }

        const valid = jwt.verify(token, process.env.JWT_SECRET);
        const yourEssays = await essays.find({ writer: valid.id });

        res.json(yourEssays);
    } catch (error) {
        console.error("Erro ao buscar redações:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
};

module.exports = { AddEssay, GetYourEssays };