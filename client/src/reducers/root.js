import { combineReducers } from 'redux';
import authentication from './authentication';
import stories from './stories';

const rootReducer = combineReducers({
    authentication,
    stories
});

export default rootReducer;
