const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: { // почта пользователя, по которой он регистрируется
    type: String,
    unique: [true, 'Пользователь с таким email уже существует!'],
    required: [true, 'Поле "email" должно быть заполнено'],
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Некорректный email',
    },
  },
  password: { // хеш пароля
    type: String,
    required: [true, 'Поле "password" должно быть заполнено'],
    select: false,
  },
  name: { // имя пользователя
    type: String,
    required: [true, 'Поле "name" должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "name" - 2'],
    maxlength: [30, 'Максимальная длина поля "name" - 30'],
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
