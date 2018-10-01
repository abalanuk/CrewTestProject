import initialState from '../initialState';
import {MOVE_STATUS_FURTHER, MOVE_STATUS_PREVIOUS, SET_CREW} from '../actions/crew';
import {StatusesMap} from '../../constants/placeholders';

export default (state = initialState.crew, action) => {
    const statusArrLength = StatusesMap.length
    switch (action.type) {
        case SET_CREW:
            return action.crew.reduce((acc, item) => {
                const {first, last} = item.name;
                const {medium} = item.picture;
                const {city} = item.location;
                acc.push({
                    fullName: `${first} ${last}`,
                    avatar: medium,
                    status: StatusesMap[0],
                    city
                });
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