import React from 'react';
import { useDispatch } from 'react-redux';
import * as StoryActions from '../actions/stories';
import { BiUpvote, BiDownvote } from "react-icons/bi";

const Rating = ({
    rateStory,
    story
}) => {

    const handleRate = (e, vote, storyId) => {
        const ratingP = document.getElementById(`story-rating-${story.id}`)
        let ratingPNum = parseInt(ratingP.innerHTML, 10);

        ratingP.innerHTML = vote ? ratingPNum+1 : ratingPNum-1;
        ratingPNum = parseInt(ratingP.innerHTML, 10);

        let downVoteBtn = document.getElementById(`downvote-${story.id}`);
        let upVoteBtn = document.getElementById(`upvote-${story.id}`);

        if (ratingPNum > story.rating) {
            upVoteBtn.setAttribute('disabled','disabled');
            downVoteBtn.removeAttribute('disabled');
        } else if (ratingPNum < story.rating) {
            downVoteBtn.setAttribute('disabled','disabled');
            upVoteBtn.removeAttribute('disabled');
        } else {
            upVoteBtn.removeAttribute('disabled');
            downVoteBtn.removeAttribute('disabled');
        }
        rateStory(vote, storyId);
    }

    return (
        <div className='sb-rating-container'>
            <div id={`upvote-${story.id}`} className='sb-vote-icon' onClick={(e) => handleRate(e, true, story.id)}><BiUpvote /></div>
            <span id={`story-rating-${story.id}`}>{story.rating}</span>
            <div id={`downvote-${story.id}`} className='sb-vote-icon' onClick={(e) => handleRate(e, false, story.id)}><BiDownvote /></div>
        </div>
    )
}

const RatingContainer = ({ story }) => {
    const dispatch = useDispatch();
    const rateStory = (vote, storyId) => dispatch(StoryActions.updateStoryRating(vote, storyId))

    return <Rating rateStory={rateStory} story={story} />
}

export default RatingContainer;
