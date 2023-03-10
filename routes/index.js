const router = require('express').Router();

const { validateLogin, validateCreateUser } = require('../utils/validation');
const { login, createUser, signOut } = require('../controllers/users');
const auth = require('../middlewares/auth');
const movieRouter = require('./movies');
const userRouter = require('./users');
const NotFoundError = require('../errors/NotFoundError');
const { errorMessages } = require('../constants/constants');

router.post('/signup', validateCreateUser, createUser);
router.post('/signin', validateLogin, login);

router.use(auth);

router.post('/signout', signOut);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use('*', (_, __, next) => next(new NotFoundError(errorMessages.pageNotFound)));

module.exports = router;
