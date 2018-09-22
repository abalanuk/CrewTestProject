import initialState from './initialState'

export const FILTER_BY_CITY = 'FILTER_BY_CITY'
export const FILTER_BY_NAME = 'FILTER_BY_NAME'
export const CLEAR_FILTER = 'CLEAR_FILTER'

export function filterByCity (filter) {
    return {type: FILTER_BY_CITY, filter}
}

export function filterByName (filter) {
    return {type: FILTER_BY_NAME, filter}
}

export function clearFilter () {
    return {type: CLEAR_FILTER}
}


export default (state = initialState.filter, action) => {
    switch (action.filter) {
        case FILTER_BY_CITY:
            return action.filter
        case FILTER_BY_NAME:
            return action.filter
        case CLEAR_FILTER:
            return ''
        default:
            return state
    }
}