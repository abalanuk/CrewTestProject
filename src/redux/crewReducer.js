import initialState from './initialState'
import {StatusesMap} from '../constants/placeholders'

export const SET_CREW = 'SET_CREW'
export const MOVE_STATUS_FURTHER = 'MOVE_STATUS_FURTHER'
export const MOVE_STATUS_PREViOUS = 'MOVE_STATUS_PREViOUS'

export function setCrew (crew) {
    return {type: SET_CREW, crew}
}

export function moveFurtherStatus (person) {
    return {type: MOVE_STATUS_FURTHER, person}
}

export function movePreviousStatus (person) {
    return {type: MOVE_STATUS_PREViOUS, person}
}

export default (state = initialState.crew, action) => {
    switch (action.type) {
        case SET_CREW:
            const processedCrew = action.crew.reduce((acc, item) => {
                const {first, last} = item.name
                const {medium} = item.picture
                acc.push({fullName: `${first} ${last}`, avatar: medium, status: StatusesMap[0]})
                return acc
            }, [])

            return processedCrew
        case MOVE_STATUS_FURTHER:
            //TODO: return processed crew
            return state
        case MOVE_STATUS_PREViOUS:
            //TODO: return processed crew
            return state
        default:
            return state
    }
}