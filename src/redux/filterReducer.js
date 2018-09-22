import initialState from './initialState'

export const SET_FILTER = 'SET_FILTER'
export const CLEAR_FILTER = 'CLEAR_FILTER'

export function setFilter(filter) {
    return {type: SET_FILTER, filter}
}

export function clearFilter() {
    return {type: CLEAR_FILTER}
}

export default (state = initialState.filter, action) => {
    switch (action.filter) {
        case SET_FILTER:
            return action.filter
        case CLEAR_FILTER:
            localStorage.removeItem("filter")
            return ''
        default:
            return state
    }
}