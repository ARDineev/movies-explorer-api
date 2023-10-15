const JWT = require('jsonwebtoken');
const AuthentificationError = require('../errors/auth-err');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new AuthentificationError('Укажите токен в заголовке "Authorization" в формате "Bearer (ваш_токен)"');
    }
    const token = authorization.split(' ')[1];
    const parsedToken = await JWT.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'SECRET_KEY');
    if (!parsedToken) {
      throw new AuthentificationError('Некорректный токен');
    }
    req.user = { _id: parsedToken._id };
    return next();
  } catch (err) {
    return next(err);
  }
};
