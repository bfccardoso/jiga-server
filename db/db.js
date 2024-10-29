// db/jigaServer.js
const sqlite3 = require('sqlite3').verbose();
// const path = require('path');
const config = require('../config/config'); // Importa as constantes

// Conecta ao banco de dados
const dbPath = config.DB_PATH;

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
  } else {
    console.log(`Banco de dados ${config.DB_NAME} criado ou aberto com sucesso.`);
    db.run('PRAGMA foreign_keys = ON');
  }
});

module.exports = db;
