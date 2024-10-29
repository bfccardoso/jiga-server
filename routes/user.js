const express = require('express');
const router = express.Router();
const usersController = require('../controllers/userController');
const {userSchema} = require('../schemas/userSchema');
const validateRequest = require('../middlewares/validateRequest');

router.post('/', validateRequest(userSchema), usersController.createUser); // Criar usuário
router.get('/', usersController.getAllUsers); // Listar usuários
router.get('/:id', usersController.getUserById); // Visualizar usuário
router.put('/:id', validateRequest(userSchema), usersController.updateUser); // Atualizar usuário
router.delete('/:id', usersController.deleteUser); // Deletar usuário

module.exports = router;
