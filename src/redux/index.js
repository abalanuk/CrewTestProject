import {combineReducers} from 'redux'
import crewReducer from './crewReducer'
import filterReducer from './filterReducer'

export default combineReducers({
    crew: crewReducer,
    filter: filterReducer
})