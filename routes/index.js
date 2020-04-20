const router = require('express').Router();
const users = require('./users');
const cards = require('./cards');

router.use('/cards', cards);
router.use('/users', users);

module.exports = router;
