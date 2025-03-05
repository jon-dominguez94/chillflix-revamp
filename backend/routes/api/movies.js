const asyncHandler = require('express-async-handler');
const router = require('express').Router();
const { Movie } = require('../../db/models');

router.get(
    '/',
    asyncHandler(async (_req, res) => {
        const movies = await Movie.findAll();

        res.json(movies);
    })
);

router.get(
    '/:movieId',
    asyncHandler(async (req, res) => {
        const { movieId } = req.params

        const movie = await Movie.findByPk(movieId);

        res.json(movie);
    })
);

module.exports = router;
