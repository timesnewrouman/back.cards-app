const router = require('express').Router();
const { celebrate } = require('celebrate');
const { getUsers, getUserById, patchUser, patchUserAvatar } = require('../controllers/users');
const getUserByIdSchema = require('../validationSchemas/getUserById');
const patchUserSchema = require('../validationSchemas/patchUser');
const patchUserAvatarSchema = require('../validationSchemas/patchUserAvatar');

router.get('/', getUsers);
router.get('/:id', celebrate(getUserByIdSchema), getUserById);
router.patch('/me', celebrate(patchUserSchema), patchUser);
router.patch('/me/avatar', celebrate(patchUserAvatarSchema), patchUserAvatar);

module.exports = router;
