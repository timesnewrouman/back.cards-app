const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');
const Card = require('../models/card');

module.exports.getCards = (req, res) => { // получение всех карточек
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.postCard = (req, res) => { // добавление карточки
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.deleteCardById = (req, res) => { // удаление карточки
  Card.findById(req.params.id)
    .orFail(() => new NotFoundError('Карточка не найдена'))
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        return Promise.reject(new ForbiddenError('Карточка добавлена не вами - удаление невозможно'));
      }
      return Card.findByIdAndRemove(req.params.id)
        .then((user) => res.send({ data: user }));
    })
    .catch((err) => {
      const statusCode = err.statusCode || 500;
      const message = statusCode === 500 ? 'Произошла ошибка' : err.message;
      res.status(statusCode).send({ message });
    });
};

module.exports.likeCard = (req, res) => { // лайк карточки
  Card.findByIdAndUpdate(req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true })
    .orFail(() => new NotFoundError('Нет карточки с таким id'))
    .then((like) => res.send({ data: like }))
    .catch((err) => {
      const statusCode = err.statusCode || 500;
      const message = statusCode === 500 ? 'Произошла ошибка' : err.message;
      res.status(statusCode).send({ message });
    });
};

module.exports.removeLike = (req, res) => { // снятие лайка карточки
  Card.findByIdAndUpdate(req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true })
    .orFail(() => new NotFoundError('Нет карточки с таким id'))
    .then((like) => res.send({ data: like }))
    .catch((err) => {
      const statusCode = err.statusCode || 500;
      const message = statusCode === 500 ? 'Произошла ошибка' : err.message;
      res.status(statusCode).send({ message });
    });
};
