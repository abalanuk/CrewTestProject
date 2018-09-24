import React, { PureComponent } from 'react';
import {connect} from 'react-redux'

import Filters from './Filters'
import {moveFurtherStatus, movePreviousStatus, fetchData} from '../redux/crewReducer'
import {StatusesMap} from '../constants/placeholders'

import '../App.css';

class ProspectiveCrew extends PureComponent {
    componentDidMount() {
        !this.props.crew.length && this.props.fetchData();
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
                                                                <div>
                                                                    <p>{filtered.fullName}</p>
                                                                    <h5>{filtered.city}</h5>
                                                                </div>
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
                                                                    <button
                                                                        className='Status-action'
                                                                        onClick={this.moveToPreviousStatus.bind(this, filtered)}
                                                                    >
                                                                        Return back
                                                                    </button> : null
                                                                }
                                                                {filtered.status !== StatusesMap[2] ?
                                                                    <button
                                                                        className='Status-action'
                                                                        onClick={this.moveToNextStatus.bind(this, filtered)}
                                                                    >
                                                                        Move further
                                                                    </button> : null
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
        const filtered = crew.filter(person => person[filter.key].includes(filter.value))
        return {crew: filtered}
    }

    return {crew}
}

const mapDispatchToProps = dispatch => {
    return {
        fetchData: () => dispatch(fetchData()),
        moveFurtherStatus: pers => dispatch(moveFurtherStatus(pers)),
        movePreviousStatus: pers => dispatch(movePreviousStatus(pers))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProspectiveCrew)
