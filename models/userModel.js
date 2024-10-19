const db = require('../db/jigaServer');

// Função para obter todos os usuários
const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT name FROM users', [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

module.exports = {
  getAllUsers,
};
