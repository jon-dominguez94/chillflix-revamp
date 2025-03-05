const asyncHandler = require('express-async-handler');
const router = require('express').Router();
const { List, Movie } = require('../../db/models');

router.get(
    '/:listId',
    asyncHandler(async (req, res) => {
        const { listId } = req.params;

        const list = await List.findByPk(listId, { include: Movie });

        res.json(list);
    })
);

router.get(
    '/',
    asyncHandler(async (req, res) => {
        const list = await List.findAll({ include: Movie });

        res.json(list);
    })
);

router.post(
    '/',
    asyncHandler(async (req, res, next) => {
        const { listId, movieId } = req.body;

        const list = await List.findByPk(listId);
        const movie = await Movie.findByPk(movieId);

        try {
            list.addMovie(movie);
            return res.json({ message: "success" });
        } catch {
            const err = new Error('Could not add movie to list');
            err.status = 401;
            err.title = 'Could not add movie to list';
            err.errors = ['Could not add movie to list.'];
            return next(err);
        }
    })
);

router.delete(
    '/',
    asyncHandler(async (req, res, next) => {
        const { listId, movieId } = req.body;

        const list = await List.findByPk(listId);
        const movie = await Movie.findByPk(movieId);

        try {
            list.removeMovie(movie);
            return res.json({ message: "success" });
        } catch {
            const err = new Error('Could not remove movie from list');
            err.status = 401;
            err.title = 'Could not remove movie from list';
            err.errors = ['Could not remove movie from list.'];
            return next(err);
        }

    })
);

module.exports = router;
