const { celebrate, Joi } = require('celebrate');
const { regExpURL } = require('../utils/constants');

module.exports.userInfoValidator = celebrate({ // валидация данных для роута PATCH /users/me
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().min(2).max(30),
  }),
});

module.exports.userLogInValidator = celebrate({ // валидация данных для роута POST /signin
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

module.exports.userCreateValidator = celebrate({ // валидация данных для роута POST /signup
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
});

module.exports.movieIdValidator = celebrate({ // валидация данных для роута DELETE /movies/_id
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
});

module.exports.movieCreateValidator = celebrate({ // валидация данных для роута POST /movies
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(regExpURL),
    trailerLink: Joi.string().required().pattern(regExpURL),
    thumbnail: Joi.string().required().pattern(regExpURL),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});
