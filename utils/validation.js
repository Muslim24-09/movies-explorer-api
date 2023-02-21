const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const linkValidator = Joi.string().required().custom((value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.message('Некорректная ссылка');
});

const validateChangeUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
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
    country: Joi.string(),
    director: Joi.string(),
    duration: Joi.number(),
    year: Joi.string(),
    description: Joi.string(),
    image: linkValidator,
    trailerLink: linkValidator,
    thumbnail: linkValidator,
    nameRU: Joi.string(),
    nameEN: Joi.string(),
    movieId: Joi.number(),
  }),
});

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    name: Joi.string(),
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
