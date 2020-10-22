import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Redirect } from 'react-router-dom';
import * as StoryActions from '../actions/stories';
import Header from './Header'
import Navbar from './Navbar';
import TagBar from './TagBar';


const StoryEditor = ({
    story,
    createPost,
    getGenres,
    genreList,
    newStoryId
}) => {
    const [bodyText, setBodyText] = useState();
    const [titleText, setTitleText] = useState();
    const [synopsisText, setSynopsisText] = useState();
    const [tagsText, setTagsInput] = useState();
    const [genreSelect, setGenre] = useState();
    const { storyId } = useParams();

    const handleBodyInput = e => setBodyText(e.target.value);
    const handleTitleInput = e => setTitleText(e.target.value);
    const handleSynopsisInput = e => setSynopsisText(e.target.value);
    const handleTagsInput = e => setTagsInput(e.target.value);
    const handleGenreInput = e => setGenre(e.target.value);

    useEffect(() => {
        getGenres()
    }, [])

    const handlePost = e => {
        if (storyId !== undefined) {
            createPost(bodyText, storyId);
            return <Redirect to={`/stories/${storyId}/page/1`} />;
        } else {
            createPost(bodyText, null, titleText, synopsisText, tagsText, genreSelect)

        }
    }

    if(!genreList) {
        return null
    }

    if(newStoryId) {
        return <Redirect to={`/stories/${newStoryId}/page/1`} />;
    }

    return (
        <div>
            <Header />
            <TagBar />
            <div className='app-layout'>
                <Navbar />
                <div className='se-container'>
                    {(storyId !== undefined ?
                        <div>
                        <h2>Contribute</h2>
                        <textarea className='se-body-textarea'onChange={handleBodyInput} placeholder='And then...' value={bodyText} />
                        <button onClick={handlePost} value={bodyText}>Post</button>
                        </div>
                        :
                        <div>
                            <h2>Edit New Story</h2>
                            <input onChange={handleTitleInput} value={titleText} placeholder='Title' type='text' />
                            <select value={genreSelect} onChange={handleGenreInput}>
                                {genreList.map(genre => <option value={genre.id}>{genre.genreName}</option>)}
                            </select>
                            <input onChange={handleSynopsisInput} value={synopsisText} placeholder='Synopsis' type='text' />
                            <textarea className='se-body-textarea' onChange={handleBodyInput} value={bodyText} placeholder='Body'/>
                            <input onChange={handleTagsInput} value={tagsText} placeholder='Tags (separate by single space)' type='text' />
                            <button onClick={handlePost} value={bodyText}>Post</button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}

const StoryEditorContainer = () => {
    const dispatch = useDispatch();
    const createPost = (bodyText, storyId, titleText, synopsisText, tagsText, genreSelect) => dispatch(StoryActions.createPost(bodyText, storyId, titleText, synopsisText, tagsText, genreSelect));
    const getGenres = () => dispatch(StoryActions.getGenres());
    const story = useSelector(state => state.stories.story);
    const genreList = useSelector(state => state.stories.genreList);
    const newStoryId = useSelector(state => state.stories.newStoryId)

    return <StoryEditor story={story} newStoryId={newStoryId} createPost={createPost} getGenres={getGenres} genreList={genreList} />
}

export default StoryEditorContainer;
