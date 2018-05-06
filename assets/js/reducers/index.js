import { combineReducers } from "redux";

import auth from './authReducer';
import commit from './commitReducer';

export default combineReducers({
    auth,
    commit
});