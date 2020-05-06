const path = require('path');

const Card = require(path.join(__dirname, '../models/card'));

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
    .then((card) => {
      if (card === null) {
        return res.status(404).send({ message: 'Карточка не найдена' });
      }
      if (card.owner.toString() !== req.user._id) {
        return res.status(403).send({ message: 'Карточка добавлена не вами - удаление невозможно' });
      }
      Card.findByIdAndRemove(req.params.id)
        .then((user) => res.send({ data: user }));
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.likeCard = (req, res) => { // лайк карточки
  Card.findByIdAndUpdate(req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true })
    .then((like) => res.send({ data: like }))
    .catch(() => res.status(404).send({ message: 'Нет карточки с таким id' }));
};

module.exports.removeLike = (req, res) => { // снятие лайка карточки
  Card.findByIdAndUpdate(req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true })
    .then((like) => res.send({ data: like }))
    .catch(() => res.status(404).send({ message: 'Нет карточки с таким id' }));
};
