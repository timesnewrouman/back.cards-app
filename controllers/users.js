const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const NotFoundError = require('../errors/notFoundError');

// eslint-disable-next-line import/no-dynamic-require
const User = require(path.join(__dirname, '../models/user'));

module.exports.getUsers = (req, res) => { // получение всех пользователей
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.getUserById = (req, res) => { // получение пользователя по id
  User.findById(req.params.id)
    .orFail(() => new NotFoundError('Пользователь не найден'))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      const statusCode = err.statusCode || 500;
      const message = statusCode === 500 ? 'Произошла ошибка' : err.message;
      res.status(statusCode).send({ message });
    });
};

module.exports.createUser = (req, res) => { // создание пользователя
  // eslint-disable-next-line object-curly-newline
  const { name, about, avatar, email } = req.body;
  bcrypt.hash(req.body.password, 10)
    // eslint-disable-next-line object-curly-newline
    .then((hash) => User.create({ name, about, avatar, email, password: hash }))
    .then((user) => {
      res.send({ data: user.omitPrivate() });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.login = (req, res) => { // авторизация пользователя
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' }),
      });
    })
    .catch((err) => {
      const statusCode = err.statusCode || 500;
      const message = statusCode === 500 ? 'Произошла ошибка' : err.message;
      res.status(statusCode).send({ message });
    });
};

module.exports.patchUser = (req, res) => { // изменение пользователя
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.patchUserAvatar = (req, res) => { // изменение аватара пользователя
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user.avatar }))
    .catch((err) => res.status(500).send({ message: err.message }));
};
