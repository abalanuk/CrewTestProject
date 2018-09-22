import React, { PureComponent } from 'react';
import {connect} from 'react-redux'

import Filters from './Filters'
import {setCrew, moveFurtherStatus, movePreviousStatus} from '../redux/crewReducer'
import fetchData from '../data/data'
import {StatusesMap} from '../constants/placeholders'

import '../App.css';

class ProspectiveCrew extends PureComponent {
    componentDidMount() {
        const {setCrew} = this.props
        fetchData('https://randomuser.me/api/?results=5')
            .then(data => {
                setCrew(data.results)
            })
            .catch(err => console.log(err))

    }

    moveToNextStatus(pers) {
        this.props.moveFurtherStatus(pers)
    }
    
    moveToPreviousStatus(pers) {
        this.props.movePreviousStatus(pers)
    }

    //TODO: refactor this method by extracting some stuff into PersonellCard component
    render() {
        const {crew} = this.props
        const statusMapLength = StatusesMap.length
        return (
            <div className='Crew-container'>
                <Filters/>
                <div className='Crew-statuses'>
                    {
                        StatusesMap.map((status, statusIndex) => {
                            return (
                                <div key={statusIndex} className='Crew-column'>
                                    <h3>{status}</h3>
                                    <ul className='Personnel-list'>
                                        {
                                            crew
                                                .filter(person => person.status === status)
                                                .map((filtered, index) => {
                                                    return (
                                                        <li key={index} className='Personnel-card'>
                                                            <div className='Personnel-info'>
                                                                <img src={filtered.avatar} alt="Avatar"/>
                                                                <p>{filtered.fullName}</p>
                                                            </div>
                                                            <div className='Status-actions'
                                                                 style={
                                                                     filtered.status === StatusesMap[0] ?
                                                                     {justifyContent: 'flex-end'} :
                                                                     filtered.status === StatusesMap[statusMapLength-1] ?
                                                                         {justifyContent: 'start'} :
                                                                         {justifyContent: 'space-between'}
                                                                 }
                                                            >
                                                                {filtered.status !== StatusesMap[0] ?
                                                                    <button onClick={this.moveToPreviousStatus.bind(this, filtered)}>Return back</button> :
                                                                    null
                                                                }
                                                                {filtered.status !== StatusesMap[2] ?
                                                                    <button onClick={this.moveToNextStatus.bind(this, filtered)}>Move further</button> :
                                                                    null
                                                                }
                                                            </div>
                                                        </li>
                                                    )
                                                })
                                        }
                                    </ul>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {crew, filter} = state

    if(filter) {
        const filtered = crew.filter(person => person[filter.key] === filter.value)
        return {crew: filtered}
    }

    return {crew}
}

const mapDispatchToProps = dispatch => {
    return {
        setCrew: crew => dispatch(setCrew(crew)),
        moveFurtherStatus: pers => dispatch(moveFurtherStatus(pers)),
        movePreviousStatus: pers => dispatch(movePreviousStatus(pers))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProspectiveCrew)
