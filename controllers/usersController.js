const userModel = require('../models/userModel');

// Controlador para lidar com a requisição de obter todos os usuários
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers(); // Chama a função do modelo
    res.status(200).json(users);
  } catch (err) {
    console.error('Erro ao obter os usuários:', err.message);
    res.status(500).send('Erro ao obter os usuários');
  }
};

module.exports = {
  getAllUsers,
};
