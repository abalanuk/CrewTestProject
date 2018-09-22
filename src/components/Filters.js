import React, { PureComponent } from 'react';
import {connect} from 'react-redux';
import {
    setFilter
} from '../redux/filterReducer'


//TODO: do not forget to save filter in localStorage for persisting between tabs
class Filters extends PureComponent {
    componentDidMount() {
        const filter = localStorage.getItem('filter')
        filter && this.props.setFilter(filter)
    }

    setFilter = (filter) => {
        this.props.setFilter(filter)
        localStorage.setItem("filter", filter);
    }

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

//TODO: as additional option we can not replace one filter by another but save both and apply them one by one
const mapDispatchToProps = dispatch => {
    return {
        setFilter: (filter) => dispatch(setFilter(filter))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters)
