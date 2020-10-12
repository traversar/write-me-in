const express = require('express');
const asyncHandler = require('express-async-handler');
const { Post, Rating, Story, StoryTag, Tag } = require('../../db/models');
const atob = require('atob');
const router = express.Router();

router.put('/:postId/', asyncHandler(async(req, res, next) => {
    const userId = JSON.parse(atob(req.cookies.token.split('.')[1])).data.id
    const postId = req.params.postId;
    const vote = req.query.rating;
    const confirm = req.query.confirm;

    let post = await Post.findOne({
        where: { id: postId },
    })

    const story = await Story.findOne({
        where: { id: post.storyId }
    })


    console.log(vote);
    if (vote !== undefined) {
        //Make record that user has rated post
        await Rating.create({
            userId,
            postId,
            vote
        })

        post.rating = vote === 'true' ? post.rating+1 : post.rating-1;
        if (post.rating >= 10) {
            post.confirmationStatus = true;
            story.confirmedPostLength += 1;
        }
    } else if (confirm !== undefined) {
        post.confirmationStatus = true;
        story.confirmedPostLength += 1;
    }

    await post.save();
    await story.save();
    res.sendStatus(200);
}))

router.post('/', asyncHandler(async(req, res, next) => {
    const userId =JSON.parse(atob(req.cookies.token.split('.')[1])).data.id

    let {
        body,
        storyId,
        title,
        synopsis,
        tags,
        genreId
    } = req.body;

    console.log(storyId)

    if (storyId) {
        let story = await Story.findOne({
            where: { id: storyId }
        })
        await Post.create({
            userId,
            storyId,
            body,
            rating: 0,
            order: story.confirmedPostLength+1,
            confirmationStatus: false
        })

        res.json(storyId);

    } else {
        let newStory = await Story.create({
            userId,
            genreId,
            title,
            synopsis,
            rating: 0,
            read: true,
            confirmedPostLength: 1,
        })

        let newPost = await Post.create({
            userId,
            storyId: newStory.id,
            body,
            rating: 0,
            order: 1,
            confirmationStatus: true
        })

        tags = tags.split(' ')
        tags.forEach(async tag => {
            let newTag = await Tag.create({
                title: tag
            })
            await StoryTag.create({
                tagId: newTag.id,
                storyId: newStory.id
            })
        })

        res.json(newStory.id);
    }
}))

module.exports = router;
