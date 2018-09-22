import initialState from './initialState'
import {StatusesMap} from '../constants/placeholders'

export const SET_CREW = 'SET_CREW'
export const MOVE_STATUS_FURTHER = 'MOVE_STATUS_FURTHER'
export const MOVE_STATUS_PREVIOUS = 'MOVE_STATUS_PREVIOUS'

export function setCrew (crew) {
    return {type: SET_CREW, crew}
}

export function moveFurtherStatus (person) {
    return {type: MOVE_STATUS_FURTHER, person}
}

export function movePreviousStatus (person) {
    return {type: MOVE_STATUS_PREVIOUS, person}
}

export default (state = initialState.crew, action) => {
    const statusArrLength = StatusesMap.length
    switch (action.type) {
        case SET_CREW:
            return action.crew.reduce((acc, item) => {
                const {first, last} = item.name
                const {medium} = item.picture
                acc.push({fullName: `${first} ${last}`, avatar: medium, status: StatusesMap[0]})
                return acc
            }, [])
        case MOVE_STATUS_FURTHER:
            return [
                ...state.map(person => {
                    if (person.fullName === action.person.fullName &&
                        action.person.status !== StatusesMap[statusArrLength-1]
                    ) {
                        const currentIndex = StatusesMap.indexOf(action.person.status)
                        return Object.assign({}, person, {status: StatusesMap[currentIndex+1]})
                    }

                    return person
                })
            ]
        case MOVE_STATUS_PREVIOUS:
            return [
                ...state.map(person => {
                    if (person.fullName === action.person.fullName &&
                        action.person.status !== StatusesMap[0]
                    ) {
                        const currentIndex = StatusesMap.indexOf(action.person.status)
                        return Object.assign({}, person, {status: StatusesMap[currentIndex-1]})
                    }

                    return person
                })
            ]
        default:
            return state
    }
}