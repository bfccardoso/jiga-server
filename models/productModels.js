const db = require('../db/db');

// Função para criar um novo produto
const createProduct = ({ nome, codigo }) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO products (nome, codigo) VALUES (?, ?)';
    db.run(query, [nome, codigo], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id: this.lastID, nome, codigo });
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
const updateProduct = (id, { nome, codigo }) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE products SET nome = ?, codigo = ? WHERE id = ?';
    db.run(query, [nome, codigo, id], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id, nome, codigo });
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

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
