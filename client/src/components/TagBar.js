import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as StoryActions from '../actions/stories';
import { useDispatch, useSelector} from 'react-redux';

const TagBar = ({
    loadTags,
    tagsList,
    searchByTag
}) => {

    useEffect(() => {
        loadTags();
    }, []);

    const handleTagSearch = (tag) => {
        searchByTag(tag);
    }

    if (!tagsList) {
        return null;
    }

    return (
        <div className='tb-container'>
            <div className='tb-content-container'>
                {/* {tagsList.map(tag => <button onClick={() => handleTagSearch(tag)} key={tag.id} className='tb-tag-link'>{tag.title}</button>)} */}
                {tagsList.map(tag => <Link onClick={() => handleTagSearch(tag)} key={tag.id} to='/'><button className='tb-tag-link'>{tag.title}</button></Link>)}
            </div>
        </div>
    )
}

const TagBarContainer = () => {
    const dispatch = useDispatch();
    const tagsList = useSelector(state => state.stories.tags);
    const loadTags = () => dispatch(StoryActions.getTags());
    const searchByTag = (tag) => dispatch(StoryActions.searchByTag(tag));

    return <TagBar tagsList={tagsList} loadTags={loadTags} searchByTag={searchByTag} />
}

export default TagBarContainer;
