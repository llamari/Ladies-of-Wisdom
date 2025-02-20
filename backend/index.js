const dbConfig = require('./config/db');
const express = require('express');
const app = express()
const userRoute = require('./routes/users');

app.use(express.json());
app.use('/users', userRoute);

dbConfig();

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});