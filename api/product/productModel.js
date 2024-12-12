const db = require('../db/db');

// Função para criar um novo produto
const createProduct = ({ name, family, description, code }) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO products (name, family, description, code) VALUES (?, ?, ?, ?)';
    console.log('description: ', description)
    db.run(query, [name, family, description, code], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id: this.lastID, name, family, description, code });
      }
    });
  });
};

// Função para obter todos os produtos
const getAllProducts = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM products', [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

// Função para obter um produto pelo ID
const getProductById = (id) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

// Função para atualizar um produto pelo ID
const updateProduct = (id, { name, family, description, code }) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE products SET name = ?, family = ?, description = ?, code = ? WHERE id = ?';
    db.run(query, [name, family, description, code, id], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id, name, family, description, code });
      }
    });
  });
};

// Função para deletar um produto pelo ID
const deleteProduct = (id) => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM products WHERE id = ?', [id], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

const isNameUsed = (name) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT COUNT(*) as count FROM products WHERE name = ?`;
    db.get(query, [name], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row.count > 0);
      }
    });
  });
};

const isNameUsedByOtherId = (name, productId) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT COUNT(*) as count FROM products WHERE name = ? AND id != CAST(? AS TEXT)`;
    db.get(query, [name, productId], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row.count > 0);
      }
    });
  });
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  isNameUsed,
  isNameUsedByOtherId
};
