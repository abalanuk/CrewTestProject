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
                console.log(data.results)
                setCrew(data.results)
            })
            .catch(err => console.log(err))

    }

    moveToNextStatus(pers) {
        //TODO: send redux action to change status of item in collection
        this.props.moveFurtherStatus(pers)
    }
    moveToPreviousStatus(pers) {
        //TODO: send redux action to change status to previous one
        this.props.movePreviousStatus(pers)
    }

    render() {
        const {crew} = this.props
        return (
            <div className='Crew-container'>
                <Filters/>
                <div className='Crew-statuses'>
                    {
                        StatusesMap.map((item, ind) => {
                            return (
                                <h3 key={ind}>
                                    {item}
                                    <ul className='Personnel-list'>
                                        {
                                            crew
                                                .filter(person => person.status === item)
                                                .map((filtered, index) => {
                                                    return (
                                                        <li key={index} className='Personnel-card'>
                                                            <div style={{display: 'flex', flexDirection: 'row'}}>
                                                                <img src={filtered.avatar} alt="Avatar"/>
                                                                <p>{filtered.fullName}</p>
                                                            </div>
                                                            {filtered.status !== StatusesMap[2] ?
                                                                <button onClick={this.moveToNextStatus.bind(this, filtered)}>Move further</button> :
                                                                null
                                                            }
                                                            {filtered.status !== StatusesMap[0] ?
                                                                <button onClick={this.moveToPreviousStatus.bind(this, filtered)}>Return back</button> :
                                                                null
                                                            }
                                                        </li>
                                                    )
                                            })
                                        }
                                    </ul>
                                </h3>
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
        setCrew: (crew) => dispatch(setCrew(crew)),
        moveFurtherStatus: () => dispatch(setCrew(moveFurtherStatus)),
        movePreviousStatus: () => dispatch(setCrew(movePreviousStatus))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProspectiveCrew)
