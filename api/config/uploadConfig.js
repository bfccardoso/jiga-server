const multer = require('multer');
const path = require('path');
// const db = require('../db/db');
const sqlite = require('sqlite');
const sqlite3 = require('sqlite3'); // use sqlite para lidar com promises

// Conexão com o banco, utilizando async/await
const dbPromise = sqlite.open({
  filename: path.join(__dirname, '../db/db.db'),
  driver: sqlite3.Database
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/uploads/firmwares'));
  },
  filename: async (req, file, cb) => {
    try {
      const { productId } = req.body;
      
      // Abre a conexão com o banco e busca o nome do produto
      const db = await dbPromise;
      const product = await db.get(`SELECT name FROM products WHERE id = ?`, [productId]);
      
      const productName = product ? product.name : 'produto_desconhecido';
      
      // Formatar data e hora para o nome do arquivo
      const now = new Date();
      const formattedDate = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;

      // Gerar o nome do arquivo com o nome do produto e a data
      const fileName = `${productName}_${formattedDate}${path.extname(file.originalname)}`;

      cb(null, fileName);
    } catch (error) {
      cb(error);
    }
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
