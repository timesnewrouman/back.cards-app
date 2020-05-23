const { Joi } = require('celebrate');

module.exports = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().regex(/(http:\/\/|https:\/\/)(www\.)?(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|(\w|-)+\.(\w|-)+(\.(\w|-))?)(:\d{1,5})?[a-zA-Z0-9/_-]+#?(\.\w+)?/im),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};
