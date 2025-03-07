const asyncHandler = require('express-async-handler');
const router = require('express').Router();
const { List, Movie, ListMovie } = require('../../db/models');

router.get(
    '/:userId',
    asyncHandler(async (req, res) => {
        const { userId } = req.params;

        const list = await List.findOne({
            where: { userId: userId },
            include: Movie,
            order: [
                [Movie, ListMovie, 'createdAt']
            ]
        });

        res.json({list});
    })
);

// remove
// router.get(
//     '/',
//     asyncHandler(async (req, res) => {
//         const list = await List.findAll({ include: Movie });

//         res.json(list);
//     })
// );

router.post(
    '/',
    asyncHandler(async (req, res, next) => {
        const { userId, movieId } = req.body;

        const list = await List.findOne({
            where: { userId: userId }
        });
        const movie = await Movie.findByPk(movieId);

        try {
            const listItem = await list.addMovie(movie);
            // return res.json({ movie: movie});
            return res.json({ListMovie: listItem[0], movie: movie});
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
        const { userId, movieId } = req.body;

        const list = await List.findOne({
            where: { userId: userId }
        });
        const movie = await Movie.findByPk(movieId);

        try {
            list.removeMovie(movie);
            return res.json({ movie: movie });
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
