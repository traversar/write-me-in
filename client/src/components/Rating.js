import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as StoryActions from '../actions/stories';
import { BiUpvote, BiDownvote } from "react-icons/bi";

const Rating = ({
    contentType,
    content,
    ratings,
    rate
}) => {

    const handleRate = (e, vote, id) => {
        if(e.currentTarget.hasAttribute('disabled')) return;
        const ratingP = document.getElementById(`content-rating-${id}`)
        let ratingPNum = parseInt(ratingP.innerHTML, 10);

        ratingP.innerHTML = vote ? ratingPNum+1 : ratingPNum-1;
        ratingPNum = parseInt(ratingP.innerHTML, 10);

        let downVoteBtn = document.getElementById(`downvote-${id}`);
        let upVoteBtn = document.getElementById(`upvote-${id}`);

        if (ratingPNum > content.rating) {
            upVoteBtn.setAttribute('disabled','disabled');
            downVoteBtn.removeAttribute('disabled');
        } else if (ratingPNum < content.rating) {
            downVoteBtn.setAttribute('disabled','disabled');
            upVoteBtn.removeAttribute('disabled');
        } else {
            upVoteBtn.removeAttribute('disabled');
            downVoteBtn.removeAttribute('disabled');
        }
        rate(vote, id);
    }

    const checkVote = (id) => {
        let type = contentType === "story" ? "stories" : "posts";
        if(ratings && ratings[type]) {
            if(id in ratings[type]) {
                if(ratings[type][id]) {
                    return 'upvote'
                } else {
                    return 'downvote'
                }
            }
        }
        return false
    }

    return (
        <div className={`sb-rating-container-${contentType}`}>
            <div
                id={`upvote-${content.id}`}
                className='sb-vote-icon'
                disabled={checkVote(content.id) === 'upvote' ? 'disabled' : ''}
                onClick={(e) => handleRate(e, true, content.id)}
            >
                <BiUpvote />
            </div>
            <span id={`content-rating-${content.id}`}>{content.rating}</span>
            <div
                id={`downvote-${content.id}`}
                className='sb-vote-icon'
                disabled={checkVote(content.id) === 'downvote' ? 'disabled' : ''}
                onClick={(e) => handleRate(e, false, content.id)}
            >
                <BiDownvote />
            </div>
        </div>
    )
}

const RatingContainer = ({ post, story }) => {
    const dispatch = useDispatch();
    const ratings = useSelector(state => state.user.ratings)

    if(story) {
        const rateStory = (vote, storyId) => dispatch(StoryActions.updateStoryRating(vote, storyId))
        return <Rating rate={rateStory} content={story} contentType="story" ratings={ratings} />
    } else {
        const ratePost = (vote, postId) => dispatch(StoryActions.updatePostRating(vote, postId))
        return <Rating rate={ratePost} content={post} contentType="post" ratings={ratings} />
    }
}

export default RatingContainer;
