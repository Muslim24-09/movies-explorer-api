require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');

const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes');
const limiter = require('./middlewares/limiter');
const { MONGO_URL } = require('./constants/constants');
const commonError = require('./middlewares/commonError');

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

app.use(errorLogger);
app.use(errors());

app.use(commonError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
