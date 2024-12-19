const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cardsRouter = require('./routes/cards');
const userRouter = require('./routes/users');
const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '675d8f19301ea4f2e4bc0131'
  };

  next();
});


app.use('/', userRouter);
app.use('/', cardsRouter);


app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
