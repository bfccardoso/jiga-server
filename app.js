const express = require('express');
const app = express();
const db = require('./db/db');  // Importa a conexão com o banco
const initDatabase = require('./db/init');  // Importa a inicialização do banco
const config = require('./config/config'); // Importa as constantes
const path = require('path');
const fs = require('fs');
const indexRoutes = require('./routes/index');
const usersRoutes = require('./routes/users');
const productsRoutes = require('./routes/products');

// Executa o script SQL uma única vez na inicialização
initDatabase(db);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// Definir EJS como template engine
app.set('view engine', 'ejs');
app.set('views', './views');  // Diretório onde ficam os arquivos .ejs
// Rotas
app.use('/', indexRoutes);
app.use('/users', usersRoutes);
app.use('/products', productsRoutes);

app.listen(config.PORT, () => {
  console.log(`Servidor rodando na porta ${config.PORT}`);
});
