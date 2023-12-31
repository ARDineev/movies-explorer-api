const mongoose = require('mongoose');
const { regExpURL } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: { // страна создания фильма
    type: String,
    required: [true, 'Поле "country" должно быть заполнено'],
  },
  director: { // режиссёр фильма
    type: String,
    required: [true, 'Поле "director" должно быть заполнено'],
  },
  duration: { // длительность фильма
    type: Number,
    required: [true, 'Поле "duration" должно быть заполнено'],
  },
  year: { // год выпуска фильма
    type: String,
    required: [true, 'Поле "year" должно быть заполнено'],
  },
  description: { // описание фильма
    type: String,
    required: [true, 'Поле "description" должно быть заполнено'],
  },
  image: { // ссылка на постер к фильму
    type: String,
    required: [true, 'Поле "image" должно быть заполнено'],
    validate: {
      validator: (v) => regExpURL.test(v),
      message: 'Некорректный URL',
    },
  },
  trailerLink: { // ссылка на трейлер фильма
    type: String,
    required: [true, 'Поле "trailerLink" должно быть заполнено'],
    validate: {
      validator: (v) => regExpURL.test(v),
      message: 'Некорректный URL',
    },
  },
  thumbnail: { // ссылка на миниатюрное изображение постера к фильму
    type: String,
    required: [true, 'Поле "thumbnail" должно быть заполнено'],
    validate: {
      validator: (v) => regExpURL.test(v),
      message: 'Некорректный URL',
    },
  },
  owner: { // _id пользователя, который сохранил фильм
    type: mongoose.ObjectId,
    required: true, // заполняется автоматически
  },
  movieId: { // id фильма, который содержится в ответе сервиса MoviesExplorer
    type: Number,
    required: [true, 'Поле "movieId" должно быть заполнено'],
  },
  nameRU: { // название фильма на русском языке
    type: String,
    required: [true, 'Поле "nameRU" должно быть заполнено'],
  },
  nameEN: { // название фильма на английском языке
    type: String,
    required: [true, 'Поле "nameEN" должно быть заполнено'],
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);
