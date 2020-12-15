const express = require('express');
const asyncHandler = require('express-async-handler');
const { Post, Rating, Story, StoryTag, Tag} = require('../../db/models');
const atob = require('atob');
const router = express.Router();

router.put('/:postId/', asyncHandler(async(req, res, next) => {
    const userId = JSON.parse(atob(req.cookies.token.split('.')[1])).data.id
    const postId = req.params.postId;
    const vote = req.query.rating === 'true' ? true : false;
    const confirm = req.query.confirm;

    let post = await Post.findOne({
        where: { id: postId },
    })


    if (vote !== undefined) {
        //Check if user has already rated post
        let existingRating = await Rating.findOne({
            where: { userId, postId }
        })

        if(existingRating) {
            if(existingRating.vote == vote) {
                return res.sendStatus(403)
            }
            post.rating = existingRating.vote === true ? post.rating-1 : post.rating+1;
            await existingRating.destroy();
        } else {
            // If not existing rating, make record that user has rated post
            await Rating.create({
                userId,
                postId,
                vote
            })
            post.rating = vote === true ? post.rating+1 : post.rating-1;
        }

        if (post.rating >= 10) {
            // Check if new rating is sufficient (>=10) to confirm post
            const story = await Story.findOne({
                where: { id: post.storyId }
            })
            post.confirmationStatus = true;
            story.confirmedPostLength += 1;
            await story.save();
        }
    }
    await post.save();

    if (confirm !== undefined) {
        const story = await Story.findOne({
            where: { id: post.storyId }
        })
        post.confirmationStatus = true;
        story.confirmedPostLength += 1;
        await story.save();
    }

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

        await Post.create({
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
