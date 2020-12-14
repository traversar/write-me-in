import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as StoryActions from '../actions/stories';
import Rating from './Rating';
import Header from './Header'
import Navbar from './Navbar';
import TagBar from './TagBar';

import { IoCloseCircle } from "react-icons/io5";

const StoryBrowser = ({
    getStories,
    storyList,
    query,
    clearQuery
}) => {
    const start = 1;
    const limit = 10;

    useEffect(() => {
        if(!query) {
            getStories(start, limit);
        }

        // Clear query div on element dismount
        return resetQuery()
    }, [])

    const resetQuery = () => {
        let queryDiv = document.querySelector('.sb-searchresult');
        if(queryDiv) queryDiv.innerHTML = '';
        clearQuery()
        getStories(start, limit)
    }

    if(!storyList) {
        return null;
    }

    return (
        <>
            <Header />
            <TagBar />
            <div className='app-layout'>
                <Navbar />
                <div className="sb-browser">
                    {query ?
                        <div className='sb-searchresult'>
                            <IoCloseCircle onClick={resetQuery} />
                            {`Results for ${query}`}
                        </div>
                    :
                        ''}
                    {storyList.map(story => {
                        return (
                            <div key={story.id} className='sb-story-navcontainer'>
                                <Rating story={{ id: story.id, rating: story.rating }} />
                                <NavLink key={story.id} className='sb-story-navlink' to={`/stories/${story.id}/page/1`}>
                                    <div>
                                        <div>
                                            <p className='sb-story-title'>{story.title}</p>
                                            <p className='sb-author-text'> by {story.user.username}</p>
                                        </div>
                                        <div className='sb-details-contributors'>
                                            {story.contributors.length > 0 && <p className='sb-contributors-text'>and contributors
                                            {story.contributors.map((contributor, idx) => (' ' + contributor.user.username + (story.contributors.length-1 === idx ? '' : ',')))}
                                            </p>}
                                        </div>
                                        <div className='sb-details-genre-syn'>
                                            <p className='sb-genre-text'>({story.genre.genreName}) </p>
                                            <p className='sb-synopsis-text'>{` ${story.synopsis}`}</p>
                                        </div>
                                    </div>
                                </NavLink>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

const StoryBrowserContainer = () => {
    const dispatch = useDispatch();
    const storyList = useSelector(state => state.stories.storyList);
    const getStories = (start, limit) => dispatch(StoryActions.getStories(start, limit));
    const query = useSelector(state => state.stories.query);
    const clearQuery = () => dispatch(StoryActions.clearQuery());

    return (
        <StoryBrowser
            storyList={storyList}
            getStories={getStories}
            query={query}
            clearQuery={clearQuery} />
    )
}

export default StoryBrowserContainer
