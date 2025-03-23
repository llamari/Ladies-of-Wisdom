const dbConfig = require('./config/db');
const express = require('express');
const cors = require('cors');
const app = express()
const userRoute = require('./routes/users');
const subjectRoute = require('./routes/subject')
const taskRoute = require('./routes/task')
const themeRoute = require('./routes/theme');

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use('/users', userRoute);
app.use('/subj', subjectRoute);
app.use('/task', taskRoute);
app.use('/themes', themeRoute)
app.get("/", (req, res) => {
    res.send("API do Ladies of Wisdom está rodando 🚀");
});

dbConfig();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});