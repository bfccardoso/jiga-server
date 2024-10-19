const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// Define o endpoint para obter todos os usuários
router.get('/', usersController.getAllUsers);

module.exports = router;
