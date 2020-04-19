const router = require('express').Router();
const { getCards, postCard, deleteCardById } = require('../../controllers/cards');

router.get('/', getCards);
router.post('/', postCard);
router.delete('/:id', deleteCardById);

module.exports = router;
