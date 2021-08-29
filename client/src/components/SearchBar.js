import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as StoryActions from '../actions/stories';

const SearchBar = ({
    searchQuery
}) => {
    const [searchInput, setSearch] = useState();
    const history = useHistory();

    const handleSearch = e => {
        searchQuery(searchInput);
        console.log('here');
        history.push('/');
    }

    const updateSearch = e => {
        setSearch(e.target.value)
    }


    return (
        <div className='sbar-container'>
            <input className='sbar-input' type='text' onKeyPress={(e) => e.key == 'Enter' ? handleSearch() : null} onChange={updateSearch} placeholder='Search stories' />
            <button onClick={handleSearch}>Search</button>
        </div>
    )
}

const SearchBarContainer = () => {
    const dispatch = useDispatch();
    const searchQuery = (query) => dispatch(StoryActions.search(query));

    return <SearchBar searchQuery={searchQuery} />
}

export default SearchBarContainer;
