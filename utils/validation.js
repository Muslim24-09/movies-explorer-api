const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { errorMessages } = require('../constants/constants');

const linkValidator = Joi.string().required().custom((value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.message(errorMessages.urlIncorrect);
});

const validateChangeUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const validateDeleteMovie = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex().required(),
  }),
});

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: linkValidator,
    trailerLink: linkValidator,
    thumbnail: linkValidator,
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number().required(),
  }),
});

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports = {
  validateLogin,
  validateCreateUser,
  validateCreateMovie,
  validateDeleteMovie,
  validateChangeUserInfo,
};
