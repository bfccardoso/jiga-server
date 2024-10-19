// routes/index.js
const express = require('express');
const router = express.Router();

// Rota para a raiz "/"
router.get('/', (req, res) => {
  res.send('Bem-vindo ao servidor Express!');
});

module.exports = router;
