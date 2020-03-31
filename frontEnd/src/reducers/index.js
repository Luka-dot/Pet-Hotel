import counterReducer from './counter';
import { combineReducers } from 'redux';
import authReducer from './auth';

const allReducers = combineReducers({
    counter: counterReducer,
    login: authReducer,
})

export default allReducers;