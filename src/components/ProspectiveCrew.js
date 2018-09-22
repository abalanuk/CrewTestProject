import React, { PureComponent } from 'react';
import {connect} from 'react-redux'
import Filters from './Filters'
import {setCrew} from '../redux/crewReducer'
import fetchData from '../data/data'

class ProspectiveCrew extends PureComponent {
    componentDidMount() {
        fetchData('https://randomuser.me/api/?results=5')
        .then(function(data){
            debugger
            this.props.setCrew(data.results)
        })
        .catch(function(err){console.log(err)})

    }
  render() {
    return (
      <div>
        <Filters/>
        <p>{this.props.crew}</p>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
    const {crew} = state

    return {crew}
}

const mapDispatchToProps = dispatch => {
    return {
        setCrew: (crew) => dispatch(setCrew(crew))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProspectiveCrew);
