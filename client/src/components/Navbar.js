import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as StoryActions from '../actions/stories';

const Navbar = ({
    getUserStories,
    userStoriesList,
    userContributionsList,
    changeReadStatus
}) => {

useLayoutEffect(() => {
    getUserStories();
}, [])

const handleReadStatus = (storyId) => {
    changeReadStatus(storyId)
}

const handleShowAll = () => {
    return
}

if(!userStoriesList || !userContributionsList) {
    getUserStories();
    return null;
}

    return (
        <div>
            <div className="nb-container-layout">
                <div className='nb-container'>
                    <h2>My Stories</h2>
                    {userStoriesList.map(story => {
                        return (
                                <NavLink key={story.id} onClick={!story.read ? () => handleReadStatus(story.id) : null} to={`/stories/${story.id}/page/1`}>
                                    <span>
                                        <h3>{story.title}</h3>
                                        {!story.read ? <p className='nb-story-readstatus'>(New Posts)</p> : null}
                                    </span>
                                </NavLink>
                        )
                    })}
                    <button className='nb-showall-btn' onClick={handleShowAll} >(Show All)</button>
                </div>
                <div className='nb-container'>
                    <h2>My Contributions</h2>
                    {userContributionsList.map(contribution => {
                        return (
                            <NavLink key={contribution.id} to={`/stories/${contribution.story.id}/page/1`}>
                                <h3>{contribution.story.title}</h3>
                            </NavLink>
                        )
                    })}
                    <button className='nb-showall-btn' onClick={handleShowAll} >(Show All)</button>
                </div>
            </div>
        </div>
    )
}

const NavbarContainer = () => {
    const dispatch = useDispatch();
    const userStories = useSelector(state => state.stories.userStories);
    const userContributions = useSelector(state => state.stories.userContributions);
    const getUserStories = () => dispatch(StoryActions.getUserStories());
    const changeReadStatus = (storyId) => dispatch(StoryActions.changeReadStatus(storyId));

    return (
        <Navbar
            userStoriesList={userStories}
            userContributionsList={userContributions}
            getUserStories={getUserStories}
            changeReadStatus={changeReadStatus} />
    )
}

export default NavbarContainer;
