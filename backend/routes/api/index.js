const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const moviesRouter = require('./movies.js');
const listRouter = require('./list.js');


router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.use('/list', listRouter);

module.exports = router;
