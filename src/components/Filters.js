import React, { PureComponent } from 'react';
import {connect} from 'react-redux';
import {setFilter} from '../redux/filterReducer';

//TODO: do not forget to save filter in localStorage for persisting between tabs
class Filters extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            city: '',
            fullName: ''
        }
    }
    componentDidMount() {
        const filter = JSON.parse(localStorage.getItem('filter'))
        if(filter) {
            this.props.setFilter(filter)
            this.setState({[filter.key]: filter.value})
        }
    }


    _setFilter = event => {
        event.preventDefault();
        const {name, value} = event.target[0];
        const filter = {key: name, value};
        this.props.setFilter(filter);
        localStorage.setItem("filter", JSON.stringify(filter));
    }

    // TODO: here can be also some validation
    _onChange = event => {
        event.preventDefault()
        const {name, value} = event.target
        this.setState({[name]: value});
        this.props.setFilter({key: name, value});
    }

    render() {
        return (
            <div className="Crew-filters">
                <form onSubmit={this._setFilter}>
                    <label htmlFor="name">by name</label>
                    <input type="text"
                           name="fullName"
                           value={this.state.fullName}
                           placeholder='Enter a name'
                           onChange={this._onChange}
                    />
                </form>
                <p>Filters</p>
                <form onSubmit={this._setFilter}>
                    <label htmlFor="city">by city</label>
                    <input type="text"
                           name="city"
                           value={this.state.city}
                           placeholder='Enter city name'
                           onChange={this._onChange}
                    />
                </form>
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
