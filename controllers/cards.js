const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');
const Card = require('../models/card');

module.exports.getCards = (req, res, next) => { // получение всех карточек
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.postCard = (req, res, next) => { // добавление карточки
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.deleteCardById = (req, res, next) => { // удаление карточки
  Card.findById(req.params.id)
    .orFail(() => new NotFoundError('Карточка не найдена'))
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        return Promise.reject(new ForbiddenError('Карточка добавлена не вами - удаление невозможно'));
      }
      return Card.findByIdAndRemove(req.params.id)
        .then((user) => res.send({ data: user }));
    })
    .catch(next); // эквивалентно .catch(err => next(err));
};

module.exports.likeCard = (req, res, next) => { // лайк карточки
  Card.findByIdAndUpdate(req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true })
    .orFail(() => new NotFoundError('Нет карточки с таким id'))
    .then((like) => res.send({ data: like }))
    .catch(next);
};

module.exports.removeLike = (req, res, next) => { // снятие лайка карточки
  Card.findByIdAndUpdate(req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true })
    .orFail(() => new NotFoundError('Нет карточки с таким id'))
    .then((like) => res.send({ data: like }))
    .catch(next);
};
