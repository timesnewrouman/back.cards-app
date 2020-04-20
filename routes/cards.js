/* eslint-disable object-curly-newline */
const router = require('express').Router();
const { getCards, postCard, deleteCardById, likeCard, removeLike } = require('../controllers/cards');

router.get('/', getCards);
router.post('/', postCard);
router.delete('/:id', deleteCardById);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', removeLike);

module.exports = router;
