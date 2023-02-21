const router = require('express').Router();
const { validateDeleteMovie, validateCreateMovie } = require('../utils/validation');
const {
  deleteMovie, createMovie, getAllMovies,
} = require('../controllers/movies');

router.get('/', getAllMovies);

router.post('/', validateCreateMovie, createMovie);

router.delete('/:_id', validateDeleteMovie, deleteMovie);

module.exports = router;
