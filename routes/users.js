const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
// eslint-disable-next-line object-curly-newline
const { getUsers, getUserById, patchUser, patchUserAvatar } = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }).unknown(true),
}), getUserById);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }).unknown(true),
}), patchUser);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(/(http:\/\/|https:\/\/)(www\.)?(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|(\w|-)+\.(\w|-)+(\.(\w|-))?)(:\d{1,5})?[a-zA-Z0-9/_-]+#?(\.\w+)?/im),
  }).unknown(true),
}), patchUserAvatar);

module.exports = router;
