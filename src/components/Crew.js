import React, { PureComponent } from 'react';
import {connect} from 'react-redux'
import Filters from './Filters'
import {setCrew} from '../redux/crewReducer'
import fetchData from '../data/data'

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
    render() {
        return (
            <div>
                <Filters/>
                <ul>
                    {
                        this.props.crew.map((item, index) => {
                            return (
                                <li key={index}>
                                    {item.fullName}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {crew} = state

    debugger
    const processedCrew = crew.reduce((acc, item) => {
        const {first, last} = item.name
        const {medium} = item.picture
        acc.push({fullName: `${first} ${last}`, avatar: medium})
        return acc
    }, [])

    return {crew: processedCrew}
}

const mapDispatchToProps = dispatch => {
    return {
        setCrew: (crew) => dispatch(setCrew(crew))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProspectiveCrew)
