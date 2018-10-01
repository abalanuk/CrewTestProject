import initialState from '../initialState';
import {SET_FILTER, CLEAR_FILTER} from '../actions/filter'

const savedFilter = localStorage.getItem('filter')
const filterState = savedFilter !== 'undefined' ? JSON.parse(savedFilter) : initialState.filter

export default (state = filterState, action) => {
    switch (action.type) {
        case SET_FILTER:
            localStorage.setItem("filter", JSON.stringify(action.filter));
            return action.filter ? action.filter : state
        case CLEAR_FILTER:
            localStorage.removeItem("filter")
            return ''
        default:
            return state
    }
}