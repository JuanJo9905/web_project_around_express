const express = require('express');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const app = express();
const PORT = 3000;

app.use(express.json());

// Usar los routers
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

// Manejador para rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ message: "Recurso solicitado no encontrado" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});