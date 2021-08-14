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

        ratingPNum = vote ? ratingPNum+1 : ratingPNum-1;
        ratingP.innerHTML = ratingPNum

        let downVoteBtn = document.getElementById(`downvote-${id}`);
        let upVoteBtn = document.getElementById(`upvote-${id}`);

        // If no existing vote and upvote, disable upvote button
        if (checkVote(id) === null && vote) {
            upVoteBtn.setAttribute('disabled','disabled');
            downVoteBtn.removeAttribute('disabled');
        // If no existing vote and downvote, disable downvote button
        } else if (checkVote(id) === null && !vote) {
            downVoteBtn.setAttribute('disabled','disabled');
            upVoteBtn.removeAttribute('disabled');
        } else {
        // Otherwise, user has nullified a previous vote, enable both
            upVoteBtn.removeAttribute('disabled');
            downVoteBtn.removeAttribute('disabled');
        }
        rate(vote, id);
    }

    const checkVote = (id) => {
        let type = contentType === "story" ? "stories" : "posts";
        if(ratings && ratings[type]) {
            if(id in ratings[type]) {
                if(ratings[type][id] === true) {
                    return 'upvote'
                } else if (ratings[type][id] === false) {
                    return 'downvote'
                }
            }
            return null
        }
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
