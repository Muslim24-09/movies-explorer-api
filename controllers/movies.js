const Movie = require('../models/movie');

const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const { errorMessages } = require('../constants/constants');

const getAllMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.status(200).send(movies))
    .catch((err) => next(err));
};

const createMovie = (req, res, next) => {
  Movie.create({ ...req.body, owner: req.user._id })
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(errorMessages.filmBadRequest));
      }
      return next(err);
    });
};

const deleteMovie = (req, res, next) => {
  const { _id } = req.params;

  Movie.findById(_id)
    .orFail(() => new NotFoundError(errorMessages.filmNotFound))
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        return next(new ForbiddenError(errorMessages.filmToDeleteAnotherUser));
      }
      return movie.remove()
        .then(() => res.send({ message: errorMessages.filmDeletedFromSaved }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError(errorMessages.filmBadRequestRemoval));
      }
      return next(err);
    });
};

module.exports = {
  getAllMovies,
  createMovie,
  deleteMovie,
};
