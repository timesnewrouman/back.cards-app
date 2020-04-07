const cardsRouter = require('express').Router();
const cards = require('../data/cards.json');

cardsRouter.get('/cards', (req, res) => {
    res.send(cards);
});

module.exports = cardsRouter;