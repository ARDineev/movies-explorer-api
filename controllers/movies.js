const Movie = require('../models/movie');
const { CREATED_CODE } = require('../utils/constants');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

module.exports.createMovie = async (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  try {
    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner: req.user,
    });
    return res.status(CREATED_CODE).send(movie);
  } catch (err) {
    return next(err);
  }
};

module.exports.getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({ owner: req.user._id }).sort({ _id: -1 });
    return res.send(movies);
  } catch (err) {
    return next(err);
  }
};

module.exports.delMovieId = async (req, res, next) => {
  const { movieId } = req.params;
  try {
    const movie = await Movie.findOne({ _id: movieId });
    if (!movie) {
      throw new NotFoundError('Запрашиваемый фильм не найден');
    }
    if (String(movie.owner) !== req.user._id) {
      throw new ForbiddenError('Нет прав для выполнения действия');
    }
    await Movie.deleteOne(movie);
    return res.send(movie);
  } catch (err) {
    return next(err);
  }
};
