import {
    LOAD, LOAD_USER_STORIES, LOAD_POSTS, LOAD_TAGS, LOAD_STORY, SHOW_QUERY, LOAD_GENRES, GET_NEW_ID, CLEAR_NEW_ID
} from '../actions/stories';

const storiesReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD:
            return {
                ...state,
                storyList: action.storyList
            }
        case LOAD_STORY:
            return {
                ...state,
                story: action.story
            }
        case LOAD_POSTS:
            return {
                ...state,
                postsList: action.posts
            }
        case LOAD_USER_STORIES:
            return {
                ...state,
                userStories: action.userStories,
                userContributions: action.userContributions
            }
        case LOAD_TAGS:
            return {
                ...state,
                tags: action.tags
            }
        case LOAD_GENRES:
            return {
                ...state,
                genreList: action.genreList
            }
        case SHOW_QUERY:
            return {
                ...state,
                query: action.query
            }
        case GET_NEW_ID:
            return {
                ...state,
                newStoryId: action.storyId
            }
        case CLEAR_NEW_ID:
            return {
                ...state,
                newStoryId: null
            }
        default: return state;
    }
}

export default storiesReducer;
