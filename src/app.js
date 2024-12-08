const express = require('express');
const app = express();
const db = require('./db/db');  // Importa a conexão com o banco
const initDatabase = require('./db/init');  // Importa a inicialização do banco
const config = require('./config/config'); // Importa as constantes
const indexRoutes = require('../index');
const userRoutes = require('./user/userRoutes');
const productRoutes = require('./product/productRoutes');
const firmwareRoutes = require('./firmware/firmwareRoutes')

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
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/firmwares', firmwareRoutes);

app.listen(config.PORT, '0.0.0.0', () => {
  console.log(`Servidor HTTPS rodando na porta ${config.PORT}`);
});
