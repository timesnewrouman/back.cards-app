/* eslint-disable object-curly-newline */
const router = require('express').Router();
const { getUsers, getUserById, createUser, patchUser, patchUserAvatar } = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.patch('/me', patchUser);
router.patch('/me/avatar', patchUserAvatar);

module.exports = router;
