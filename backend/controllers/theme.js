const themes = require('../models/themes');

const AddTheme = async (req, res) => {
    const { title, texts } = req.body;

    const newTheme = new themes({
        title: title,
        texts: texts
    })

    await newTheme.save()
    res.status(201).json(newTheme);
}

const GetThemes = async (req, res) => {
    const temas = await themes.find();
    res.json(temas);
}

const GetTheme = async (req, res) => {
    const { id } = req.params;  // Acesse o id do corpo da requisição
    try {
        const tema = await themes.findById(id);
        if (!tema) {
            console.log(`id: ${id} \nTema não encontrado`)
            return res.status(404).json({ message: "Tema não encontrado" });
        }
        console.log(tema);
        res.json(tema);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar o tema" });
    }
};

module.exports = { AddTheme, GetThemes, GetTheme };