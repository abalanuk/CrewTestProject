import React, { PureComponent } from 'react';
import {connect} from 'react-redux';
import {
    filterByCity,
    filterByName,
} from '../redux/filterReducer'


class Filters extends PureComponent {
    render() {
        return (
            <div className="filters">
                <p>Here should be Filter component</p>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return state
}

const mapDispatchToProps = dispatch => {
    return {
        filterByCity: (city) => dispatch(filterByCity(city)),
        filterByName: (name) => dispatch(filterByName(name)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters)
