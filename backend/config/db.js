const mongoose = require('mongoose');
require('dotenv').config();

const dbConfig = () => {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Conexão com o MongoDB estabelecida com sucesso!'))
  .catch((error) => console.log('Erro ao conectar ao MongoDB:', error));
};

module.exports = dbConfig;