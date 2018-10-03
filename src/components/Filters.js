import React, { PureComponent } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {setFilter} from '../redux/actions/filter';

class Filters extends PureComponent {
    constructor(props) {
        super(props)
        this._onChange = this._onChange.bind(this)
    }
    // TODO: here can be also some validation
    _onChange(event) {
        event.preventDefault();
        event.stopPropagation();
        const {name, value} = event.target;
        this.props.setFilter({key: name, value});
    }

    render() {
        const {filter} = this.props
        return (
            <div className="Crew-filters">
                <form>
                    <label htmlFor="name">by name</label>
                    <input type="text"
                           name="fullName"
                           value={filter.key === 'fullName'? filter.value : ''}
                           placeholder='Enter a name'
                           onChange={this._onChange}
                    />
                </form>
                <p>Filters</p>
                <form>
                    <label htmlFor="city">by city</label>
                    <input type="text"
                           name="city"
                           value={filter.key === 'city'? filter.value : ''}
                           placeholder='Enter city name'
                           onChange={this._onChange}
                    />
                </form>
            </div>
        );
    }
}

Filters.propTypes = {}

const mapStateToProps = state => {
    return {filter: state.filter}
}

//TODO: as additional option we can not replace one filter by another but save both and apply them one by one
const mapDispatchToProps = dispatch => {
    return {
        setFilter: (filter) => dispatch(setFilter(filter))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters)
