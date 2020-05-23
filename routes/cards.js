const router = require('express').Router();
const { celebrate } = require('celebrate');
// eslint-disable-next-line object-curly-newline
const { getCards, postCard, deleteCardById, likeCard, removeLike } = require('../controllers/cards');
const likeCardSchema = require('../validationSchemas/likeCard');
const removeLikeSchema = require('../validationSchemas/removeLike');
const deleteCardByIdSchema = require('../validationSchemas/deleteCardById');
const postCardSchema = require('../validationSchemas/postCard');

router.get('/', getCards);
router.post('/', celebrate(postCardSchema), postCard);
router.delete('/:id', celebrate(deleteCardByIdSchema), deleteCardById);
router.put('/:cardId/likes', celebrate(likeCardSchema), likeCard);
router.delete('/:cardId/likes', celebrate(removeLikeSchema), removeLike);

module.exports = router;
