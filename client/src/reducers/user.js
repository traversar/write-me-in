import {
    SET_USER_DATA,
    REMOVE_USER_DATA
} from '../actions/authentication';

import {
    SET_RATINGS
} from '../actions/user'

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ratings: action.user.ratings
            }
        case REMOVE_USER_DATA:
            return {};
        case SET_RATINGS:
            return {
                ...state,
                ratings: action.ratings
            }
        default: return state;
    }
}

export default userReducer;
