import React, { PureComponent } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Filters from './Filters';
import {moveFurtherStatus, movePreviousStatus, fetchData} from '../redux/actions/crew';
import {StatusesMap} from '../constants/placeholders';

import '../App.css';
import PersonnelCard from './PersonellCard';

class ProspectiveCrew extends PureComponent {
    constructor(props) {
        super(props)
        this.moveToNextStatus = this.moveToNextStatus.bind(this)
        this.moveToPreviousStatus = this.moveToPreviousStatus.bind(this)
    }

    componentDidMount() {
        !this.props.crew.length && this.props.fetchData();
    }

    moveToNextStatus(person) {
        this.props.moveFurtherStatus(person)
    }
    
    moveToPreviousStatus(person) {
        this.props.movePreviousStatus(person)
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

ProspectiveCrew.propTypes = {}

const mapStateToProps = state => {
    const {crew, filter} = state

    if(filter.value) {
        const filtered = crew.filter(person => person[filter.key].includes(filter.value))
        return {crew: filtered}
    }

    return {crew}
}

const mapDispatchToProps = dispatch => {
    return {
        fetchData: () => dispatch(fetchData()),
        moveFurtherStatus: person => dispatch(moveFurtherStatus(person)),
        movePreviousStatus: person => dispatch(movePreviousStatus(person))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProspectiveCrew)
