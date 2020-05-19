const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
// eslint-disable-next-line object-curly-newline
const { getCards, postCard, deleteCardById, likeCard, removeLike } = require('../controllers/cards');

router.get('/', getCards);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri(),
  }).unknown(true),
}), postCard);
router.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }).unknown(true),
}), deleteCardById);
router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }).unknown(true),
}), likeCard);
router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }).unknown(true),
}), removeLike);

module.exports = router;
