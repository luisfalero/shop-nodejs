const express = require('express');
const MoviesServices = require('../services/moviesService');

const { movieIdSchema, createMovieSchema, updateMovieSchema } = require('../utils/schemas/moviesSchema');

const validationHandler = require('../utils/middleware/validationHandler');

function moviesApi(app) {
  const router = express.Router();
  app.use('/api/movies', router);

  const moviesService = new MoviesServices();

  router.get('/', async function (req, res, next) {
    const { tags } = req.query;
    try {
      const movies = await moviesService.getMovies({ tags });
      res.status(200).json({
        data: movies,
        message: 'Movies listed'
      });
    } catch (error) {
      next(error)
    }
  });

  router.get('/:movieId',
    validationHandler({ movieId: movieIdSchema }, 'params'),
    async function (req, res, next) {
      const { movieId } = req.params;
      try {
        const movies = await moviesService.getMovie({ movieId });
        res.status(200).json({
          data: movies,
          message: 'Movies retive'
        });
      } catch (error) {
        next(error)
      }
    });

  router.post('/',
    validationHandler(createMovieSchema),
    async function (req, res, next) {
      const { body: movie } = req;
      try {
        const createMovieId = await moviesService.createMovie({ movie });
        res.status(201).json({
          data: createMovieId,
          message: 'Movie create'
        });
      } catch (error) {
        next(error)
      }
    });

  router.put('/:movieId',
    validationHandler({ movieId: movieIdSchema }, 'params'),
    validationHandler(updateMovieSchema),
    async function (req, res, next) {
      const { movieId } = req.params;
      const { body: movie } = req;
      try {
        const updatedMovieId = await moviesService.updateMovie({ movieId, movie });
        res.status(200).json({
          data: updatedMovieId,
          message: 'Movie update'
        });
      } catch (error) {
        next(error)
      }
    });

  router.delete('/:movieId',
    validationHandler({ movieId: movieIdSchema }, 'params'),
    async function (req, res, next) {
      const { movieId } = req.params;
      try {
        const deleteMovieId = await moviesService.deleteMovie({ movieId });
        res.status(200).json({
          data: deleteMovieId,
          message: 'Movie delete'
        });
      } catch (error) {
        next(error)
      }
    });
}

module.exports = moviesApi;