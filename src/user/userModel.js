const db = require('../db/db');

// Função para criar um novo usuário
const createUser = ({name, email}) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
    db.run(query, [name, email], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, name, email });
        }
    });
  });
};

// Função para retornar todos os usuários
const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT id, name, email FROM users', [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

// Função para retornar um usuário por ID
const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT id, name, email FROM users WHERE id = ?', [id], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

// Função para atualizar um usuário por ID
const updateUser = (id, userData) => {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE users SET name = ?, email = ? WHERE id = ?',
      [userData.name, userData.email, id],
      function (err) {
        if (err) reject(err);
        else resolve({ id, ...userData });
      }
    );
  });
};

// Função para excluir um usuário por ID
const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM users WHERE id = ?', [id], function (err) {
      if (err) reject(err);
      else resolve();
    });
  });
};

const isEmailUsed = (email) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT COUNT(*) as count FROM users WHERE email = ?`;
    db.get(query, [email], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row.count > 0);
      }
    });
  });
};

const isEmailUsedByOtherId = (email, userId) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT COUNT(*) as count FROM users WHERE email = ? AND id != CAST(? AS INTEGER)`;
    db.get(query, [email, userId], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row.count > 0);
      }
    });
  });
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  isEmailUsed,
  isEmailUsedByOtherId
};
