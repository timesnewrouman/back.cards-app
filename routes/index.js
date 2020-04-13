const router = require('express').Router();
const users = require('./users/users');
const cards = require('./cards/cards');

router.use('/cards', cards);
router.use('/users', users);

module.exports = router;
