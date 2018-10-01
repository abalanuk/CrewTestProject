import {combineReducers} from 'redux';

import crewReducer from './reducers/crewReducer';
import filterReducer from './reducers/filterReducer';

export default combineReducers({
    crew: crewReducer,
    filter: filterReducer
})