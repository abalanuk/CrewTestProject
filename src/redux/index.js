import {combineReducers} from 'redux'
import crewReducer from './crewReducer'

export default combineReducers({
    crew: crewReducer
})