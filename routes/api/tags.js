const express = require('express');
const asyncHandler = require('express-async-handler');
const { Tag, StoryTag, Story, User, StoryContributor, Genre, Sequelize } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async(req, res, next) => {
    const limit = req.query.limit;

    const tags = await Tag.findAll({
        limit,
        order: [Sequelize.literal('RANDOM()')]
    })

    if (tags) {
        res.json(tags)
    } else {
        const err = Error("Tags not found");
        err.status = 404;
        next(err);
    }
}));

router.get('/:tagId', asyncHandler(async(req, res, next) => {
    const tagId = req.params.tagId;

    const storyTags = await StoryTag.findAll({
        where: { tagId },
        include: {
            model: Story, as: 'story',
                include: [
                    { model: User, as: 'user' },
                    { model: Genre, as: 'genre' },
                    { model: StoryContributor, as: 'contributors',
                        include: [
                            { model: User, as: 'user'}
                        ]
                    }
                ]
        }
    })

    const stories = storyTags.map(storyTag => {
        return storyTag.story
    })

    // const tag = await Tag.findOne({
    //     where: { id: tagId }
    // })

    // console.log(tag);

    // const stories = await Story.findAll({
    //     include: { model: Tag, as: 'tags'},
    //     where: { tag: tag }
    // })

    // const StoryTags = findAll({
    //     where: { tagId },
    //     include: { model: Story, as: 'story' }
    // })



    if (stories) {
        res.json(stories)
    } else {
        const err = Error("Stories not found");
        err.status = 404;
        next(err);
    }
}));

module.exports = router;
