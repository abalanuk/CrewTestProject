import {SET_FILTER} from './filter';

export const SET_CREW = 'SET_CREW';
export const MOVE_STATUS_FURTHER = 'MOVE_STATUS_FURTHER';
export const MOVE_STATUS_PREVIOUS = 'MOVE_STATUS_PREVIOUS';

export function fetchData() {
    return (dispatch) => {
        fetch('https://randomuser.me/api/?nat=gb&results=5')
            .then(function(resp){
                return resp.json();
            })
            .then(function(data){
                dispatch({type: SET_CREW, crew: data.results})
                dispatch({type: SET_FILTER})
            })
    }
}

export function moveFurtherStatus (person) {
    return {type: MOVE_STATUS_FURTHER, person}
}

export function movePreviousStatus (person) {
    return {type: MOVE_STATUS_PREVIOUS, person}
}