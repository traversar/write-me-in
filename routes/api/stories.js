const express = require('express');
const asyncHandler = require('express-async-handler');
const { Story, StoryContributor, User, Post, Rating, Sequelize, Genre } = require('../../db/models');
const atob = require('atob');

const router = express.Router();

router.get('/', asyncHandler(async(req, res, next) => {
    let search = req.query.search;
    const Op = Sequelize.Op;

    let specifiedUser = Boolean(req.query.user);
    let userId = specifiedUser ? JSON.parse(atob(req.cookies.token.split('.')[1])).data.id : null;

    let start = req.query.start;
    let limit = req.query.limit;

    const stories = search ?
        await Story.findAll({
            include: [
                { model: User, as: 'user'},
                { model: Genre, as: 'genre'},
                { model: StoryContributor, as: 'contributors',
                    include: { model: User, as: 'user'}
                }
            ],
            where: {
                [Op.or]: {
                    title: {
                        [Op.iLike]: '%'+search+'%'
                    },
                }
            }
        })
    :
    specifiedUser ?
        [await Story.findAll({
            where: {
                userId,
            },
        }), await StoryContributor.findAll({
            where: {
                userId
            },
            include: [
                {model: Story, as: 'story'}
            ]
        })]
    :
        await Story.findAll({
            limit,
            offset: start,
            include: [
                {model: User, as: 'user'},
                {model: Genre, as: 'genre'},
                {model: StoryContributor, as: 'contributors', include: [{model: User, as: 'user'}]}
            ]
        })

        if(search) console.log(stories);

    if(stories) {
        res.json(stories);
    } else {
        const err = Error("Stories not found");
        err.status = 404;
        next(err);
    }
}));

router.get('/:storyId/posts', asyncHandler(async(req, res, next) => {
    const storyId = req.params.storyId;
    // const { start, step } = req.query;

    const posts = await Post.findAll({
        where: { storyId },
        include: { model: User, as: 'user', include: [{model: Rating, as: 'ratings'}]},
        order: [['order', 'ASC']],
        // limit: step,
        // offset: start
    });

    if (posts) {
        res.json(posts);
    } else {
        const err = Error("Posts not found");
        err.status = 404;
        next(err);
    }
}));

router.get('/:storyId', asyncHandler(async(req, res, next) => {
    const storyId = req.params.storyId;

    const story = await Story.findOne({
        where: { id: storyId },
        include: [{ model: User, as: 'user'}]
    });

    if(story) {
        res.json(story);
    } else {
        const err = Error("Stories not found");
        err.status = 404;
        next(err);
    }
}));

router.put('/:storyId', asyncHandler(async(req, res, next) => {
    const update = req.query.update;

    if(update === 'status') {
        const story = await Story.findOne({
            where: { id: req.params.storyId },
        })

        story.read = story.read ? false : true;
        await story.save();
        res.sendStatus(200)
    }

    if(update === 'rating') {
        const { vote } = req.query;
        const { storyId } = req.params;
        const story = await Story.findOne({
            where: { id: storyId },
        })

        story.rating = vote === true ? story.rating+1 : story.rating-1;
        await story.save();
        res.sendStatus(200)
    }
}));


module.exports = router;
