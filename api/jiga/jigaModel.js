const db = require('../db/db');

// Função para criar uma nova jiga
const createJiga = ({ name, code, productId }) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO jigas (name, code, product_id) VALUES (?, ?, ?)';
    db.run(query, [name, code, productId], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id: this.lastID, name, code, productId });
      }
    });
  });
};

// Função para obter todas as jigas
const getAllJigas = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM jigas', [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

// Função para obter uma jiga pelo ID
const getJigaById = (id) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM jigas WHERE id = ?', [id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

// Função para obter uma jiga pelo código
const getJigaByCode = (code) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM jigas WHERE code = ?', [code], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

// Função para atualizar uma jiga pelo ID
const updateJiga = (id, { name, code, productId }) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE jigas SET name = ?, code = ?, product_id = ? WHERE id = ?';
    db.run(query, [name, code, productId, id], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id, name, code, productId });
      }
    });
  });
};

// Função para deletar uma jiga pelo ID
const deleteJiga = (id) => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM jigas WHERE id = ?', [id], function (err) {
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
    const query = `SELECT COUNT(*) as count FROM jigas WHERE name = ?`;
    db.get(query, [name], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row.count > 0);
      }
    });
  });
};

const isNameUsedByOtherId = (name, jigaId) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT COUNT(*) as count FROM jigas WHERE name = ? AND id != CAST(? AS TEXT)`;
    db.get(query, [name, jigaId], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row.count > 0);
      }
    });
  });
};

const isCodeUsed = (code) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT COUNT(*) as count FROM jigas WHERE code = ?`;
    db.get(query, [code], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row.count > 0);
      }
    });
  });
};

const isCodeUsedByOtherId = (code, jigaId) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT COUNT(*) as count FROM jigas WHERE code = ? AND id != CAST(? AS TEXT)`;
    db.get(query, [code, jigaId], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row.count > 0);
      }
    });
  });
};

module.exports = {
  createJiga,
  getAllJigas,
  getJigaById,
  getJigaByCode,
  updateJiga,
  deleteJiga,
  isNameUsed,
  isNameUsedByOtherId,
  isCodeUsed,
  isCodeUsedByOtherId
};
