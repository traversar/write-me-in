import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

import * as StoryActions from '../actions/stories';
import * as UserActions from '../actions/user';

import Post from './Post.js'
import Header from './Header'
import Navbar from './Navbar';
import TagBar from './TagBar';


const StoryView = ({
    story,
    postsList,
    getStory,
    getPosts,
    refreshRatings
}) => {

    useEffect(() => {
        refreshRatings();
    }, [])

    const { storyId, pageNum } = useParams();
    let [pages, setPages] = useState([]);
    let [postsPerPage, setPostsPerPage] = useState(5);
    let [currentPage, setCurrentPage] = useState(1);
    let [posts, setPosts] = useState([]);

    const generateNavs = (numPosts, numPerPage=postsPerPage) => {
        let numPages = numPosts % numPerPage === 0 ? numPosts/numPerPage : numPosts/numPerPage + 1;
        return Array.from({length: numPages}, (_, index) => index+1)
    }

    useEffect(() => {
        setCurrentPage(1)
        getStory(storyId);
        getPosts(storyId);
    }, [storyId]);


    useEffect(() => {
        if(postsList){
            setPages(generateNavs(postsList.length));
            if(currentPage === Number(-1)) {console.log('true'); setCurrentPage(generateNavs[generateNavs.length-1])}
            console.log(currentPage)
            let start = 0 + ((currentPage-1) * postsPerPage);
            setPosts(postsList.slice(start, start + 5))
        }
    }, [postsList, currentPage]);

    if(!postsList || !story) {
        return null;
    }

    return (
        <div>
            <Header />
            <TagBar />
            <div className='app-layout'>
                <Navbar />
                <div className='sv-container'>

                    <div className='sv-title-container'>
                        <h2>{story.title}</h2>
                        <h3>editor: {story.user.username}</h3>
                    </div>

                    <div className='sv-pagenums'>
                        <div>
                            <span className='sv-page-btn' onClick={() => setCurrentPage(current => current > 1 ? current-1 : current)}>{'<'}</span>
                            {pages.map(num => (
                                // add check condition if num is equal to query page, if so render number without link
                                <span key={num}>
                                    {num === parseInt(currentPage, 10) ? <span className='sv-page-btn-selected'>{num}</span> : <span className='sv-page-btn' onClick={() => setCurrentPage(num)}>{num}</span>}
                                </span>
                            ))}
                            <span className='sv-page-btn' onClick={() => setCurrentPage(current => current < pages.length ? current+1 : current)}>{'>'}</span>
                        </div>
                    </div>

                    {posts.map(post => (
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
                        <span className='sv-page-btn' onClick={() => setCurrentPage(current => current > 1 ? current-1 : current)}>{'<'}</span>
                            {pages.map(num => (
                                <span key={num}>
                                    {num === parseInt(currentPage, 10) ? <span className='sv-page-btn-selected'>{num}</span> : <span className='sv-page-btn' onClick={() => setCurrentPage(num)}>{num}</span>}
                                </span>
                            ))}
                        <span className='sv-page-btn' onClick={() => setCurrentPage(current => current < pages.length ? current+1 : current)}>{'>'}</span>
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
    const refreshRatings = () => dispatch(UserActions.refreshRatings());

    return <StoryView story={story} postsList={postsList} getStory={getStory} getPosts={getPosts} refreshRatings={refreshRatings} />
}

export default StoryViewContainer;
