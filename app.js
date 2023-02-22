require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');

const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');
const NotFoundError = require('./errors/NotFoundError');
const limiter = require('./middlewares/limiter');
const { MONGO_URL } = require('./constants/constants');

const { PORT = 3000 } = process.env;

mongoose.set('strictQuery', false);

mongoose.connect(MONGO_URL);
const app = express();

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());

app.use(requestLogger);

app.use(cors);

app.use(limiter);

app.use(router);

app.use('*', (_, __, next) => next(new NotFoundError('Страница не найдена')));

app.use(errorLogger);
app.use(errors());

app.use((err, _, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(500).send({ message: `На сервере произошла ошибка: ${err.message}` });
  }
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
