import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as StoryActions from '../actions/stories';
import Header from './Header'
import Navbar from './Navbar';
import TagBar from './TagBar';
import Rating from './Rating';


const StoryBrowser = ({
    getStories,
    storyList,
    query
}) => {
    const start = 1;
    const limit = 10;

    useEffect(() => {
        getStories(start, limit);
    }, [])

    if(!storyList) {
        return null;
    }


// Add links within storyNavLink that rerenders storyList with specifiers such as User
// also add back button to return from specified
// Add Reviews link inside of a <div> after each navlink that fetches reviews by storyId
// and fill e.target ?? Keep thinking
//  => object with keys=storyIds, if obj.storyId exists, map commments. onclick, if object.storyId
//      exists, delete, if not, fetch.
//      pull navLinks out and implement this within each of those, so only each navLink must reload!

// Reimplement this route with queries to set start and limit
// use these as page links (generate these like you do posts in
// story view)
// Then, use History
// => Better yet, implement infinite scroll

// Add div at top that checks for searchResult variable to display the parameters of the results being
// shown

    return (
        <main>
            <Header />
            <TagBar />
            <div className='app-layout'>
                <Navbar />
                <div className="sb-browser">
                    {query ? <div className='sb-searchresult'>{`Results for ${query}`}</div> : ''}
                    {storyList.map(story => {
                        return (
                            <div key={story.id} className='sb-story-navcontainer'>
                                <NavLink key={story.id} className='sb-story-navlink' to={`/stories/${story.id}/page/1`}>
                                    <div>
                                        <div>
                                            <p className='sb-story-title'>{story.title}</p>
                                            <p className='sb-author-text'> by {story.user.username}</p>
                                        </div>
                                        <div className='sb-details-contributors'>
                                            {story.contributors.length > 0 && <p className='sb-contributors-text'>and
                                            {story.contributors.map((contributor, idx) => (' ' + contributor.user.username + (story.contributors.length-1 === idx ? '' : ',')))}
                                            </p>}
                                        </div>
                                        <div className='sb-details-genre-syn'>
                                            <p className='sb-genre-text'>({story.genre.genreName}) </p>
                                            <p className='sb-synopsis-text'> {story.synopsis}</p>
                                        </div>
                                    </div>
                                </NavLink>
                                <Rating story={{ id: story.id, rating: story.rating }} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </main>
    )
}

const StoryBrowserContainer = () => {
    const dispatch = useDispatch();
    const storyList = useSelector(state => state.stories.storyList);
    const getStories = (start, limit) => dispatch(StoryActions.getStories(start, limit));
    const query = useSelector(state => state.stories.query);

    return (
        <StoryBrowser
            storyList={storyList}
            getStories={getStories}
            query={query} />
    )
}

export default StoryBrowserContainer
