const { errorMessages } = require('../constants/constants');

const commonError = (err, _, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(500).send({ message: `${errorMessages.serverError} : ${err.message}` });
  }
  next();
};

module.exports = commonError;
