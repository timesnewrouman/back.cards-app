const router = require('express').Router();
const { getUsers, getUserById, patchUser, patchUserAvatar } = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', getUserById);
router.patch('/me', patchUser);
router.patch('/me/avatar', patchUserAvatar);

module.exports = router;
