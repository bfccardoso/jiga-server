const db = require('../db/db');

// Função para criar um novo produto
const createProduct = ({ name, code }) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO products (name, code) VALUES (?, ?)';
    db.run(query, [name, code], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id: this.lastID, name, code });
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
const updateProduct = (id, { name, code }) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE products SET name = ?, code = ? WHERE id = ?';
    db.run(query, [name, code, id], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id, name, code });
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

const isCodeUsed = (code) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT COUNT(*) as count FROM products WHERE code = ?`;
    db.get(query, [code], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row.count > 0);
      }
    });
  });
};

const isCodeUsedByOtherId = (code, productId) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT COUNT(*) as count FROM products WHERE code = ? AND id != CAST(? AS TEXT)`;
    db.get(query, [code, productId], (err, row) => {
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
  isCodeUsed,
  isCodeUsedByOtherId
};
