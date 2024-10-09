const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

let cards = [];

// Cargar datos de tarjetas
const loadCards = async () => {
  try {
    const data = await fs.readFile(path.join(__dirname, '..', 'data', 'cards.json'), 'utf8');
    cards = JSON.parse(data);
  } catch (error) {
    console.error('Error loading cards:', error);
  }
};

loadCards();

// GET /cards - Obtener todas las tarjetas
router.get('/', (req, res) => {
  res.json(cards);
});

// GET /cards/:id - Obtener una tarjeta por ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const card = cards.find(c => c._id === id);

  if (!card) {
    return res.status(404).json({ message: "ID de tarjeta no encontrado" });
  }

  res.json(card);
});

module.exports = router;