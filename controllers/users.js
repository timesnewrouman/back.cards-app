/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable import/no-dynamic-require */
const path = require('path');

const User = require(path.join(__dirname, '../models/user'));

module.exports.getUsers = (req, res) => { // получение всех пользователей
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.getUserById = (req, res) => { // получение пользователя по id
  User.findById(req.params.id)
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
  if (!User.findById(req.params.id)) {
    return res.status(404).send({ message: 'Нет пользователя с таким id' });
  }
};

module.exports.createUser = (req, res) => { // создание пользователя
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.patchUser = (req, res) => { // изменение пользователя
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.patchUserAvatar = (req, res) => { // изменение аватара пользователя
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
};
