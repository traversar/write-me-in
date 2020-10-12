const express = require('express');
const asyncHandler = require('express-async-handler');
const { Genre } = require('../../db/models');
const router = express.Router();

router.get('/', asyncHandler(async(req, res, next) => {
    const genreList = await Genre.findAll();
    if (genreList) {
        res.json(genreList)
    } else {
        const err = Error('Stories not found');
        err.status = 404;
        next(err);
    }
}))

module.exports = router;
