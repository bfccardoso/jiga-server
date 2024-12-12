const User = require('./userModel');
const UserDTO = require('./userDTO');

const createUser = async (req, res) => {
  try {
    const { email } = req.body;
    // Verifique se o email já está em uso por outro usuário
    if (email && await User.isEmailUsed(email)) {
      
      return res.status(400).json({ error: 'Email já cadastrado.' });
    }
    const userData = UserDTO.fromRequest(req.body); // Dados formatados pelo DTO
    const user = await User.createUser(userData);
    res.status(201).json(UserDTO.toResponse(user)); // Resposta formatada pelo DTO
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers();
    const response = users.map(UserDTO.toResponse); // Lista formatada pelo DTO
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.getUserById(id);
    if (user) {
      res.json(UserDTO.toResponse(user));
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;
    // Verifique se o email já está em uso por outro usuário
    if (email && await User.isEmailUsedByOtherId(email, id)) {
      
      return res.status(400).json({ error: 'Email já está em uso por outro usuário.' });
    }
    const updateUserData = UserDTO.fromRequest(req.body);
    const updatedUser = await User.updateUser(id, updateUserData);
    
    res.json(UserDTO.toResponse(updatedUser));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.deleteUser(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};
