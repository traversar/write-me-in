import { SET_USER_DATA, REMOVE_USER_DATA } from '../actions/authentication';
import { SET_RATINGS } from '../actions/user'
import { UPDATE_RATINGS } from '../actions/stories'

const stateDefault = {
    ratings: {
        stories: {},
        posts: {}
    }
}

const userReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ratings: action.user.ratings
            }
        case REMOVE_USER_DATA:
            return { ...stateDefault };
        case SET_RATINGS:
            return {
                ...state,
                ratings: action.ratings
            }
        case UPDATE_RATINGS:
            const newState = {...state};
            if (newState.ratings[action.contentType][action.contentId] !== undefined) {
                delete newState.ratings[action.contentType][action.contentId]
            } else {
                newState.ratings[action.contentType][action.contentId] = action.vote
            }
            return newState
        default: return state;
    }
}

export default userReducer;
