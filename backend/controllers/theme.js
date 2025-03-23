const themes = require('../models/themes');

const AddTheme = async (req, res) => {
    const { title, texts } = req.body;

    const newTheme = new themes({
        title: title,
        texts: texts
    })

    await newTheme.save()
    res.status(201).json(newTask);
}

const GetThemes = async (req, res) => {
    const temas = await themes.find();
    res.json(temas);
}

module.exports = { AddTheme, GetThemes };