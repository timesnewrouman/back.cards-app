const router = require('express').Router();
// eslint-disable-next-line object-curly-newline
const { getUsers, getUserById, patchUser, patchUserAvatar } = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', getUserById);
router.patch('/me', patchUser);
router.patch('/me/avatar', patchUserAvatar);

module.exports = router;
