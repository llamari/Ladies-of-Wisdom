const dbConfig = require('./config/db');
const express = require('express');
const cors = require('cors');
const app = express()
const userRoute = require('./routes/users');

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use('/users', userRoute);
app.get("/", (req, res) => {
    res.send("API do Ladies of Wisdom está rodando 🚀");
});

dbConfig();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});