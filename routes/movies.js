const router = require('express').Router();
const { movieIdValidator, movieCreateValidator } = require('../middlewares/validators');

const {
  createMovie,
  getMovies,
  delMovieId,
} = require('../controllers/movies');

router.get('/', getMovies); // возвращает все сохранённые текущим пользователем фильмы
router.delete('/:movieId', movieIdValidator, delMovieId); // удаляет сохранённый фильм по id
// создаёт фильм с переданными в теле
// country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail,movieId
router.post('/', movieCreateValidator, createMovie);
// router.put('/:cardId/likes', cardIdValidator, likeCard);
// router.delete('/:cardId/likes', cardIdValidator, dislikeCard);

module.exports = router;
