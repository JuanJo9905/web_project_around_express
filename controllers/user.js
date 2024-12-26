const User = require('../models/user');

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener los usuarios', error: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).orFail(() => {
      const error = new Error('Usuario no encontrado');
      error.statusCode = 404;
      throw error;
    });
    res.status(200).json(user);
  } catch (err) {
    if (err.statusCode === 404) {
      return res.status(404).json({ message: err.message });
    }
    res.status(500).json({ message: 'Error al obtener el usuario', error: err.message });
  }
};

const createUser = async (req, res) => {
  const { name, about, avatar } = req.body;
  const user = new User({ name, about, avatar });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: 'Datos inválidos al crear el usuario', error: err.message });
    }
    res.status(500).json({ message: 'Error al crear el usuario', error: err.message });
  }
};

const updateUserProfile = async (req, res) => {
  const { name, about } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true }
    ).orFail(() => {
      const error = new Error('Usuario no encontrado');
      error.statusCode = 404;
      throw error;
    });

    
    res.status(200).json(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: 'Datos inválidos al actualizar el perfil', error: err.message });
    }
    if (err.statusCode === 404) {
      return res.status(404).json({ message: err.message });
    }
    res.status(500).json({ message: 'Error al actualizar el perfil', error: err.message });
  }
};

const updateUserAvatar = async (req, res) => {
  const { avatar } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true }
    ).orFail(() => {
      const error = new Error('Usuario no encontrado');
      error.statusCode = 404;
      throw error;
    });
    res.status(200).json(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: 'Datos inválidos al actualizar el avatar', error: err.message });
    }
    if (err.statusCode === 404) {
      return res.status(404).json({ message: err.message });
    }
    res.status(500).json({ message: 'Error al actualizar el avatar', error: err.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar
};
