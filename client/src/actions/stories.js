import * as AuthActions from './authentication'

export const LOAD = 'LOAD';
export const LOAD_USER_STORIES = 'LOAD_USER_STORIES';
export const SEARCH = 'SEARCH';
export const LOAD_POSTS = 'GET_POSTS';
export const LOAD_STORY = 'LOAD_STORY';
export const LOAD_TAGS = 'LOAD_TAGS';
export const SHOW_QUERY = 'SHOW_QUERY';
export const LOAD_GENRES = 'LOAD_GENRES';
export const GET_NEW_ID = 'GET_NEW_ID';
export const CLEAR_NEW_ID = 'CLEAR_NEW_ID';
export const CLEAR_QUERY = 'CLEAR_QUERY';
export const UPDATE_RATINGS = 'UPDATE_RATINGS';
const USER_RATINGS = 'writemein/userdata/ratings'


export const createPost = (body, storyId, title, synopsis, tags, genreId) => async(dispatch, getState) => {
    if(!storyId && !synopsis) {
        synopsis = body.substring(0, 494) + ' [...]'
    }
    const { authentication: { token } } = getState();
    const response = await fetch(
        `/api/posts/`, {
            method:'post',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({body, storyId, title, synopsis, tags, genreId})
        }
    )

    if (response.ok) {
        const storyId = await response.json();
        dispatch(getNewId(storyId));
        return storyId;
    }
}

export const clearNewStoryId = () => async(dispatch, getState) => {
    dispatch({ type: CLEAR_NEW_ID })
}

const getNewId = (storyId) => ({
    type: GET_NEW_ID,
    storyId
})

export const searchByTag = (tag) => async(dispatch, getState) => {
    const { authentication: { token } } = getState();
    const response = await fetch(
        `/api/tags/${tag.id}`,
        { headers: { Authorization: `Bearer ${token}`} }
    )
    if (response.ok) {
        const storyList = await response.json();
        console.log(storyList)
        dispatch(load(storyList))
        dispatch(showQuery('Tag: ' + tag.title))
    }
}

const showQuery = query => ({
    type: SHOW_QUERY,
    query
})

export const clearQuery = () => async(dispatch, getState) => {
    dispatch({ type: CLEAR_QUERY })
}

export const getTags = (limit = 10) => async(dispatch, getState) => {
    const { authentication: { token } } = getState();
    const response = await fetch(
        `/api/tags/?limit=${limit}`,
        { headers: { Authorization: `Bearer ${token}` } }
    )

    if (response.ok) {
        const tags = await response.json();
        dispatch(loadTags(tags))
    }
}

const loadTags = (tags) => ({
    type: LOAD_TAGS,
    tags
})

export const getStory = (storyId) => async(dispatch, getState) => {
    const { authentication: { token } } = getState();
    const response = await fetch(
        `/api/stories/${storyId}`,
        { headers: { Authorization: `Bearer ${token}`}}
    )

    if (response.ok) {
        const story = await response.json();
        dispatch(loadStory(story));
    }
}

const loadStory = story => ({
    type: LOAD_STORY,
    story
})

const updateRating = (vote, contentId, contentType) => ({
    type: UPDATE_RATINGS,
    vote,
    contentId,
    contentType
})

export const updateStoryRating = (vote, storyId) => async (dispatch, getState) => {
    const { authentication: { token } } = getState();
    const response = await fetch(
        `/api/stories/${storyId}/?update=rating&rating=${vote}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
    )
    if (response.ok) {
        dispatch(updateRating(vote, storyId, 'stories'));
        dispatch(updateStoredRatings());
    }
}

const updateStoredRatings = () => async (dispatch, getState) => {
        const ratings = getState().user.ratings
        localStorage.removeItem(USER_RATINGS)
        localStorage.setItem(USER_RATINGS, JSON.stringify(ratings))
}

export const updatePostRating = (vote, postId) => async (dispatch, getState) => {
    const { authentication: { token } } = getState();
    const response = await fetch(
        `/api/posts/${postId}/?rating=${vote}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
    )
    if (response.ok) {
        dispatch(updateRating(vote, postId, 'posts'));
        dispatch(updateStoredRatings());
    }
}

export const confirmPost = postId => async (dispatch, getState) => {
    const { authentication: { token } } = getState();
    const response = await fetch(
        `/api/posts/${postId}/?confirm=true`, {
            method: 'put',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
    )
    if (response.ok) {
        getStory();
    }

}

const load = storyList => ({
    type: LOAD,
    storyList
});

export const getStories = (start, limit) => async (dispatch, getState) => {
    const { authentication: { token } } = getState();
    const response = await fetch(
        `/api/stories/?start=${start}&limit=${limit}`,
        { headers: { Authorization: `Bearer ${token}` },
    });

    if(response.ok) {
        const storyList = await response.json();
        dispatch(load(storyList));
    }
}

const loadUserStories = userStoryLists => ({
    type: LOAD_USER_STORIES,
    userStories: userStoryLists[0],
    userContributions: userStoryLists[1]
});

export const getUserStories = () => async (dispatch, getState) => {
    const { authentication: { token } } = getState();
    const response = await fetch(
        `/api/stories/?&user=true`,
        { headers: { Authorization: `Bearer ${token}` },
    });

    if(response.ok) {
        const userStoryLists = await response.json();
        dispatch(loadUserStories(userStoryLists));
    } else if (response.status === 401) {
        dispatch(AuthActions.removeToken())
    }
}

export const search = query => async (dispatch, getState) => {
    const { authentication: { token } } = getState();
    const response = await fetch(
        `/api/stories/?search=${query}`,
        { headers: { Authorization: `Bearer ${token}` } }
    );

    if(response.ok) {
        const storyList = await response.json();
        dispatch(load(storyList));
        dispatch(showQuery('"'+query+'"'));
    }
}

export const changeReadStatus = (storyId) => async (dispatch, getState) => {
    const { authentication: { token } } = getState();
    const response = await fetch(
        `/api/stories/${storyId}/?update=status`,
        {
            method: 'put',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
    });
    if(response.ok) {
        getUserStories();
    }
}


const loadPosts = posts => ({
    type: LOAD_POSTS,
    posts
})

export const getPosts = (storyId, start, step) => async (dispatch, getState) => {
    const { authentication: { token } } = getState();
    const response = await fetch(`/api/stories/${storyId}/posts`, {
        headers: {
            Authorization: `Bearer ${token}`,
            // Check user id on token serverside, for user dependent post properties
        },
    });

    if(response.ok) {
        const posts = await response.json();
        dispatch(loadPosts(posts));
    }
}

export const getGenres = () => async (dispatch, getState) => {
    const { authentication: { token } } = getState();
    const response = await fetch(
        `/api/genres/`,
        { headers: { Authorization: `Bearer ${token}`} }
    )

    if (response.ok) {
        const genreList = await response.json();
        dispatch(loadGenres(genreList));
    }
}

const loadGenres = genreList => ({
    type: LOAD_GENRES,
    genreList
})
