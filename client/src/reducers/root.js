import { combineReducers } from 'redux';
import authentication from './authentication';
import stories from './stories';
import user from './user'

const rootReducer = combineReducers({
    authentication,
    user,
    stories
});

export default rootReducer;
