const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');

const { Movie } = require('../../db/models');

const router = express.Router();

const validateFetch = [
    check('movieId')
        .isNumeric()
        .withMessage('Invalid movie ID'),
    handleValidationErrors
];

router.get(
    '/',
    asyncHandler(async (_req, res) => {
        const movies = await Movie.findAll();

        res.json({movies});
    })
);

router.get(
    '/:movieId',
    // validateFetch,
    asyncHandler(async (req, res) => {
        const { movieId } = req.params

        const movie = await Movie.findByPk(movieId);

        res.json({movie});
    })
);

module.exports = router;
