import React, { PureComponent } from 'react';
import {connect} from 'react-redux'

import Filters from './Filters'
import {moveFurtherStatus, movePreviousStatus, fetchData} from '../redux/crewReducer'
import {StatusesMap} from '../constants/placeholders'

import '../App.css';
import PersonnelCard from './PersonellCard'

class ProspectiveCrew extends PureComponent {
    componentDidMount() {
        !this.props.crew.length && this.props.fetchData();
    }

    moveToNextStatus = (pers) => {
        this.props.moveFurtherStatus(pers)
    }
    
    moveToPreviousStatus = (pers) => {
        this.props.movePreviousStatus(pers)
    }

    render() {
        const {crew} = this.props
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
                                                    return <PersonnelCard
                                                        data={{filtered, index}}
                                                        moveFurther={this.moveToNextStatus}
                                                        moveToPrevious={this.moveToPreviousStatus}
                                                    />
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
