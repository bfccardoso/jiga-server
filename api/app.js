const express = require('express');
const cors = require('cors');
const db = require('./db/db');  // Importa a conexão com o banco
const initDatabase = require('./db/init'); // Inicializa o banco
const config = require('./config/config');
const userRoutes = require('./user/userRoutes');
const productRoutes = require('./product/productRoutes')
const firmwareRoutes = require('./firmware/firmwareRoutes');
const jigaRoutes = require('./jiga/jigaRoutes');

const app = express();

app.use(cors());

// Middleware de dados
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Executa o script SQL para inicializar o banco de dados
initDatabase(db);

// Rotas da API
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/firmwares', firmwareRoutes);
app.use('/api/jigas', jigaRoutes);

// Inicialização do servidor
app.listen(config.API_PORT, () => {
  console.log(`Servidor da API rodando na porta ${config.API_PORT}`);
});

module.exports = app;
