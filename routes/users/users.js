/* eslint-disable import/no-dynamic-require */
/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const router = require('express').Router();
const path = require('path');

const users = require(path.join(__dirname, '../../data/users.json'));

router.get('/', (req, res) => {
  res.send(users);
});

router.get('/:id', (req, res) => {
  const user = users.find((item) => item._id === req.params.id);
  if (!user) {
    return res.status(404).send({ message: 'Нет пользователя с таким id' });
  }
  res.send(user);
});

module.exports = router;
