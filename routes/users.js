const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

let users = [];

// Cargar datos de usuarios
const loadUsers = async () => {
  try {
    const data = await fs.readFile(path.join(__dirname, '..', 'data', 'users.json'), 'utf8');
    users = JSON.parse(data);
  } catch (error) {
    console.error('Error loading users:', error);
  }
};

loadUsers();

// GET /users - Obtener todos los usuarios
router.get('/', (req, res) => {
  res.json(users);
});

// GET /users/:id - Obtener un usuario por ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find(u => u._id === id);

  if (!user) {
    return res.status(404).json({ message: "ID de usuario no encontrado" });
  }

  res.json(user);
});

module.exports = router;