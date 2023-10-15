const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const User = require('../models/user');
const { CREATED_CODE } = require('../utils/constants');
const NotFoundError = require('../errors/not-found-err');
const EmptyFieldsError = require('../errors/empty-fields-err');
const AuthentificationError = require('../errors/auth-err');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createUser = async (req, res, next) => {
  const {
    email, password, name,
  } = req.body;
  if (!email || !password) {
    throw new EmptyFieldsError('Поля email и password являются обязательными');
  }
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      email, password: hash, name,
    });
    return res.status(CREATED_CODE).send({
      _id: user._id, email, name: user.name,
    });
  } catch (err) {
    return next(err);
  }
};

module.exports.updateUserProfile = async (req, res, next) => {
  const { email, name } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user,
      { email, name },
      { new: true, runValidators: true }, // передать обновлённый объект и провалидировать
    );
    if (!user) {
      throw new NotFoundError('Запрашиваемый пользователь не найден');
    }
    return res.send(user);
  } catch (err) {
    return next(err);
  }
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new EmptyFieldsError('Необходимо заполнить поля email и password');
  }
  try {
    const user = await User.findOne({ email }).select('+password'); // password по умолчанию не выдается
    if (!user) {
      throw new AuthentificationError('Неудача аутентификации. Проверьте поля email и password');
    }
    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      throw new AuthentificationError('Неудача аутентификации. Проверьте поля email и password');
    }
    const payload = { _id: user._id };
    const token = JWT.sign(payload, NODE_ENV === 'production' ? JWT_SECRET : 'SECRET_KEY', { expiresIn: '7d' });
    return res.send({ token });
  } catch (err) {
    return next(err);
  }
};

module.exports.getUserInfo = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    if (!user) {
      throw new NotFoundError('Пользователь не найден');
    }
    return res.send(user); // подумать, чтоб не отдавал _id
  } catch (err) {
    return next(err);
  }
};
