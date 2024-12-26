const Card = require('../models/cards');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find();
    res.status(200).json(cards);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener las tarjetas', error: err.message });
  }
};

const createCard = async (req, res) => {
  const { name, link } = req.body;
  const card = new Card({ name, link, owner: req.user._id });

  try {
    const newCard = await card.save();
    res.status(201).json(newCard);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: 'Datos inválidos al crear la tarjeta', error: err.message });
    }
    res.status(500).json({ message: 'Error al crear la tarjeta', error: err.message });
  }
};

const deleteCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.cardId).orFail(() => {
      const error = new Error('Tarjeta no encontrada');
      error.statusCode = 404;
      throw error;
    });
    await card.deleteOne();
    res.status(200).json({ message: 'Tarjeta eliminada con éxito' });
  } catch (err) {
    if (err.statusCode === 404) {
      return res.status(404).json({ message: err.message });
    }
    res.status(500).json({ message: 'Error al eliminar la tarjeta', error: err.message });
  }
};

const likeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    ).orFail(() => {
      const error = new Error('Tarjeta no encontrada');
      error.statusCode = 404;
      throw error;
    });
    res.status(200).json(card);
  } catch (err) {
    if (err.statusCode === 404) {
      return res.status(404).json({ message: err.message });
    }
    res.status(500).json({ message: 'Error al dar like a la tarjeta', error: err.message });
  }
};

const dislikeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true }
    ).orFail(() => {
      const error = new Error('Tarjeta no encontrada');
      error.statusCode = 404;
      throw error;
    });
    res.status(200).json(card);
  } catch (err) {
    if (err.statusCode === 404) {
      return res.status(404).json({ message: err.message });
    }
    res.status(500).json({ message: 'Error al dar unlike a la tarjeta', error: err.message });
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard
};
