import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as StoryActions from '../actions/stories'

const Post = ({
    post,
    ratePost,
    confirmPost,
    status,
    userId,
    storyUserId
}) => {

    const handleRate = (e, vote, postId) => {
        const ratingP = document.getElementById(`post-${post.id}`)
        let ratingPNum = parseInt(ratingP.innerHTML, 10);

        ratingP.innerHTML = vote ? ratingPNum+1 : ratingPNum-1;
        ratingPNum = parseInt(ratingP.innerHTML, 10);

        let downVoteBtn = document.getElementById(`downvote-${post.id}`);
        let upVoteBtn = document.getElementById(`upvote-${post.id}`);

        if (ratingPNum > post.rating) {
            upVoteBtn.setAttribute('disabled','disabled');
            downVoteBtn.removeAttribute('disabled');
        } else if (ratingPNum < post.rating) {
            downVoteBtn.setAttribute('disabled','disabled');
            upVoteBtn.removeAttribute('disabled');
        } else {
            upVoteBtn.removeAttribute('disabled');
            downVoteBtn.removeAttribute('disabled');
        }
        ratePost(vote, postId);
    }

    const toggleHiddenPost = e => {
        const targetPost = e.target.parentNode.nextSibling;
        if(targetPost.classList.contains('sv-post-hidden')) {
            targetPost.classList.remove('sv-post-hidden');
        } else {
            targetPost.classList.add('sv-post-hidden');
        }
    }

    const handleConfirmPost = e => {
        confirmPost(post.id);
        status = 'confirmed';
        e.target.parentNode.parentNode.classList.remove('sv-post-unconfirmed');
        e.target.parentNode.parentNode.classList.add('sv-post-newlyconfirmed');
        let statusTxt = document.querySelector('.sv-post-statustext');
        statusTxt.remove();
        e.target.remove();
    }

    return (
        <div>
        {status === 'confirmed' ?
            <div className="sv-post sv-post-confirmed">
                <div className='blur-element'>`</div>
                <span>by </span><h3>{post.user.username}</h3>
                <p>{post.body}</p>
                <span>
                    <div className='sv-rating-container'>
                        <button id={`upvote-${post.id}`} disabled={post.user.rating ? 'disabled' : ''} onClick={(e) => handleRate(e, true, post.id)}>Upvote</button>
                        <span id={`post-${post.id}`}>{post.rating}</span>
                        <button id={`downvote-${post.id}`} disabled={post.user.rating ? 'disabled' : ''} onClick={(e) => handleRate(e, false, post.id)}>Downvote</button>
                    </div>
                </span>
            </div>
        :
        status === 'rejected' ?
            <div>
                <div>
                    <button className='sv-rejected-btn' onClick={toggleHiddenPost}>Show rejected from {post.user.username}</button>
                </div>
                <div className="sv-post sv-post-rejected sv-post-hidden">
                    <span>by </span><h3>{post.user.username}</h3>
                    <p>{post.body}</p>
                </div>
            </div>
        :
        status === 'unconfirmed' ?
            <div className="sv-post sv-post-unconfirmed">
                <span>by </span><h3>{post.user.username}</h3><span className='sv-post-statustext'> (pending)</span>
                <p>{post.body}</p>
                <div className='sv-rating-container'>
                    {storyUserId === userId ? <button onClick={handleConfirmPost} className='sv-confirmpost-btn'>Confirm Post</button> : ''}
                    <button id={`upvote-${post.id}`} disabled={post.user.rating ? 'disabled' : ''} onClick={(e) => handleRate(e, true, post.id)}>Upvote</button>
                    <span id={`post-${post.id}`}>{post.rating}</span>
                    <button id={`downvote-${post.id}`} disabled={post.user.rating ? 'disabled' : ''} onClick={(e) => handleRate(e, false, post.id)}>Downvote</button>
                </div>
            </div>
        : null
        }
        </div>
    )
}

const PostContainer = ({post, status, storyUserId}) => {
    const dispatch = useDispatch();
    const ratePost = (vote, postId) => dispatch(StoryActions.updatePostRating(vote, postId));
    const confirmPost = (postId) => dispatch(StoryActions.confirmPost(postId));
    const userId = useSelector(state => JSON.parse(atob(state.authentication.token.split('.')[1])).data.id);

    return <Post
        userId={userId}
        storyUserId={storyUserId}
        post={post}
        status={status}
        ratePost={ratePost}
        confirmPost={confirmPost} />
}

export default PostContainer;
