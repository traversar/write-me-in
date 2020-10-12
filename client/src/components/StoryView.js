// how many posts per page
// load on scroll?
// jump to end?
// => how about: 5 posts per page, make function that divides total number of posts by 5
// to generate navlinks at the bottom with different querystrings to fetch each 5 post
// increment

// also, need function that maps all confirmed & unconfirmed posts up until
// 'order number === number of confirmed posts', passing a hidden class to unconfirmed
// posts. When 'order number > number of confirmed posts' those unconfirmed posts will
// be visible but of a class style more precarious, to show that they are
// not instantiated--opened to editor or user approval.

// contribute button on all pages, with pop-up editor.

// Implement rating.
// create backend routes
//      put /api/stories/:id/?update=rating --change Stories rating
//      put /api/ratings/?story=storyId     --create rating entry for user&story
//      put /api/ratings/?post=postId       --create rating entry for user&post
// => when posts/stories are fetched, include ratings where postid/storyid and userid

import React, { useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink, Link } from 'react-router-dom';

import * as StoryActions from '../actions/stories';
import Post from './Post.js'
import Header from './Header'
import Navbar from './Navbar';
import TagBar from './TagBar';


const StoryView = ({
    story,
    postsList,
    getStory,
    getPosts,
}) => {
    const { storyId, pageNum } = useParams();

    const generateNavs = (numPosts, numPages=5) => {
        // returns array; first ele = # of posts on last page;
        // second ele = # of pages
        return [numPosts % numPages, Array.from({length: Math.ceil(numPosts/numPages)}, (_, index) => index+1)];
    }

    useEffect(() => {
        getStory(storyId);
    }, [storyId]);


    useLayoutEffect(() => {
        if(story) {
            const [lastPage, numPages] = generateNavs(story.confirmedPostLength)
            var step = 5;
            var start = (parseInt(pageNum, 10) * 5) - 5;
            if(pageNum === numPages) {
                step = lastPage;
            }
            getPosts(storyId, start, step);
        }
    }, [story, pageNum, storyId]);




    if(!postsList || !story) {
        return null;
    }

    const [lastPage, numPages] = generateNavs(story.confirmedPostLength)

    return (
        <div>
            <Header />
            <TagBar />
            <div className='app-layout'>
                <Navbar />
                <div className='sv-container'>
                    {/* <div className='blur-element'>`</div> */}
                    <h2>{story.title}</h2>
                    <h3>editor: {story.user.username}</h3>

                    <div className='sv-pagenums'>
                        <div>
                        {numPages.map(num => (
                            // add check condition if num is equal to query page, if so render number without link
                                <span key={num}>
                                    {num === parseInt(pageNum, 10) ? `${num}` : <NavLink to={`/stories/${storyId}/page/${num}`}>{num}</NavLink>}
                                    {/* {num == pageNum ? `${num}` : <button onclick={renderPosts} to={`/stories/${storyId}/page/${num}`}>{num}</NavLink>} */}
                                    <span>{num === numPages.length ? '' : ' | '}</span>
                                </span>
                        ))}
                        </div>
                    </div>

                    {postsList.map(post => (
                        <div key={post.id}>
                        {post.order <= story.confirmedPostLength ?
                            post.confirmationStatus ?
                            <Post post={post} status='confirmed' />
                            :
                            <Post post={post} status='rejected' />
                        :
                        <Post storyUserId={story.user.id} post={post} status='unconfirmed' />
                        }
                        </div>
                    ))}

                    <div className='sv-writenext-btn-container'>
                    <Link to={`/write/${story.id}`}><button className='sv-writenext-btn'>Write Next Post</button></Link>
                    </div>

                    <div className='sv-pagenums'>
                        <div>
                        {numPages.map(num => (
                            // add check condition if num is equal to query page, if so render number without link
                                <span key={num}>
                                    {num === parseInt(pageNum, 10) ? `${num}` : <NavLink to={`/stories/${storyId}/page/${num}`}>{num}</NavLink>}
                                    {/* {num == pageNum ? `${num}` : <button onclick={renderPosts} to={`/stories/${storyId}/page/${num}`}>{num}</NavLink>} */}
                                    <span>{num === numPages.length ? '' : ' | '}</span>
                                </span>
                        ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

const StoryViewContainer = () => {
    const dispatch = useDispatch();
    const postsList = useSelector(state => state.stories.postsList);
    const story = useSelector(state => state.stories.story);
    const getPosts = (storyId, start, step) => dispatch(StoryActions.getPosts(storyId, start, step));
    const getStory = storyId => dispatch(StoryActions.getStory(storyId));

    return <StoryView story={story} postsList={postsList} getStory={getStory} getPosts={getPosts} />
}

export default StoryViewContainer;
