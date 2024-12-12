// dbSetup.js
const fs = require('fs');
const path = require('path');
//const db = require('./jigaServer'); // Importa a conexão com o banco de dados

const initDatabase = (db) => {
  const scriptPath = path.resolve(__dirname, './setup.sql'); // Caminho do script SQL

  // Lê o arquivo de script SQL
  fs.readFile(scriptPath, 'utf-8', (err, sql) => {
    if (err) {
      console.error('Erro ao ler o arquivo setup.sql:', err.message);
      return;
    }

    // Executa o script SQL
    db.exec(sql, (err) => {
      if (err) {
        console.error('Erro ao executar o script SQL:', err.message);
      } else {
        console.log('Tabelas verificadas/criadas com sucesso.');
      }
    });
  });
};

module.exports = initDatabase;
