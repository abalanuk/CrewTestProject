import React, { PureComponent } from 'react';
import {connect} from 'react-redux'

class PersonnelCard extends PureComponent {
    render() {
        return (
            <div>Here should refactored PersonnelCard</div>
        );
    }
}

const mapStateToProps = state => {
    return state
}

const mapDispatchToProps = dispatch => {
    return {
        setCrew: (dispatch) => {}
    }
}

export default connect()(PersonnelCard)
