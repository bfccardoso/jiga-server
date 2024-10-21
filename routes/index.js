// routes/index.js
const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel')

// Rota para a raiz "/"
// router.get('/', (req, res) => {
//   res.send('Bem-vindo ao servidor Express!');
// });
router.get('/', async (req, res) => {
  const users = await userModel.getAllUsers();

  // Renderizar o template 'index.ejs' e enviar dados
  res.render('index', { name: 'Visitante', users });
});

module.exports = router;
