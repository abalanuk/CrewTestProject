import initialState from './initialState'

export const SET_CREW = 'SET_CREW'

export function setCrew (crew) {
    return {type: SET_CREW, crew}
}

export default (state = initialState.crew, action) => {
    switch (action.type) {
        case SET_CREW:
            return action.crew
        default:
            return state
    }
}