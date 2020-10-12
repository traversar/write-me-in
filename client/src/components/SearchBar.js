import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as StoryActions from '../actions/stories';

const SearchBar = ({
    searchQuery
}) => {
    const [searchInput, setSearch] = useState();

    const handleSearch = e => {
        searchQuery(searchInput);
    }

    const updateSearch = e => {
        setSearch(e.target.value)
    }

    return (
        <div className='sbar-container'>
            <input className='sbar-input' type='text' onChange={updateSearch} placeholder='Search stories' />
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
