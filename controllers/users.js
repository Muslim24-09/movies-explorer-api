const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const ConflictError = require('../errors/ConflictError');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');

const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  return bcrypt
    .hash(password, 10)
    .then(async (hash) => {
      const userAlreadyCreated = await User.findOne(({ email: req.body.email }));
      if (!userAlreadyCreated) {
        await User.create({
          name,
          email,
          password: hash,
        }).then((user) => res
          .status(200)
          .send({
            name: user.name,
            email: user.email,
          }))
          .catch((err) => {
            if (err.name === 'ValidationError') {
              next(new BadRequestError('Неправильно набран логин или пароль'));
            } else next(err);
          });
      } else {
        throw new ConflictError('Пользователь с таким email уже зарегистрирован');
      }
    })
    .catch((err) => next(err));
};
const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          // sameSite: 'none',
          // secure: true,
          sameSite: true,
        })
        .cookie('loggedIn', true, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          // sameSite: 'none',
          // secure: true,
          sameSite: true,
        });

      return res.send({ token });
    })
    .catch((err) => next(err));
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      if (!user) {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }
      return res.status(200).send({ data: user, token });
    })
    .catch((err) => next(err));
};

const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  return User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }
      return res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('В поля введены неверные значения'));
      } else if (err.kind === 'ObjectId') {
        next(new BadRequestError('Ошибка в типе ключа'));
      } else next(err);
    });
};

const signOut = (_, res) => {
  const token = '';
  res
    .cookie('jwt', token, {
      maxAge: 3600000 * 24 * 7,
      httpOnly: true,
      // sameSite: 'none',
      // secure: true,
      sameSite: true,
    })
    .send({ message: 'Успешнo разлогинились' });
};

module.exports = {
  getCurrentUser,
  createUser,
  updateUser,
  login,
  signOut,
};
