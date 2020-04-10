/* eslint-disable import/no-dynamic-require */
const router = require('express').Router();
const path = require('path');

const cards = require(path.join(__dirname, '../../data/cards.json'));

router.get('/', (req, res) => {
  res.send(cards);
});

module.exports = router;
