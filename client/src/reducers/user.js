import {
    SET_USER_DATA,
    REMOVE_USER_DATA
} from '../actions/authentication';

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.user
            }

        case REMOVE_USER_DATA:
            return {};
        default: return state;
    }
}

export default userReducer;
