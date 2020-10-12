import React from 'react';
import { useDispatch } from 'react-redux';
import * as StoryActions from '../actions/stories';

const Rating = ({
    rateStory,
    story
}) => {

    // const handleRate = (e, vote, storyId) => {
    //     rateStory(vote, storyId);
    //     e.target.setAttribute('disabled', 'disabled')
    //     const ratingEle = document.getElementById(`story-${story.id}`)
    //     ratingEle.innerHTML = vote ? story.rating+1 : story.rating-1;
    // }

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
            <button id={`upvote-${story.id}`} onClick={(e) => handleRate(e, true, story.id)}>Upvote</button>
            <span id={`story-rating-${story.id}`}>{story.rating}</span>
            <button id={`downvote-${story.id}`} onClick={(e) => handleRate(e, false, story.id)}>Downvote</button>
        </div>
    )
}

const RatingContainer = ({ story }) => {
    const dispatch = useDispatch();
    const rateStory = (vote, storyId) => dispatch(StoryActions.updateStoryRating(vote, storyId))

    return <Rating rateStory={rateStory} story={story} />
}

export default RatingContainer;
