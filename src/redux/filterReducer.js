import initialState from './initialState'

export const SET_FILTER = 'SET_FILTER'
export const CLEAR_FILTER = 'CLEAR_FILTER'

export function setFilter(filter) {
    return {type: SET_FILTER, filter}
}

export function clearFilter() {
    return {type: CLEAR_FILTER}
}

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