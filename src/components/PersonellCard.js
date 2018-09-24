import React, { PureComponent } from 'react';
import {StatusesMap} from '../constants/placeholders'

class PersonnelCard extends PureComponent {
    _moveToPrevious = (data) => {
        this.props.moveToPrevious(data)
    }

    _moveFurther = (data) => {
        this.props.moveFurther(data)
    }

    render() {
        const {filtered, index} = this.props.data
        const statusMapLength = StatusesMap.length
        return (
            <li key={index} className='Personnel-card'>
                <div className='Personnel-info'>
                    <img src={filtered.avatar} alt="Avatar"/>
                    <div>
                        <p>{filtered.fullName}</p>
                        <h5>{filtered.city}</h5>
                    </div>
                </div>
                <div className='Status-actions'
                     style={
                         filtered.status === StatusesMap[0] ?
                             {justifyContent: 'flex-end'} :
                             filtered.status === StatusesMap[statusMapLength-1] ?
                                 {justifyContent: 'start'} :
                                 {justifyContent: 'space-between'}
                     }
                >
                    {filtered.status !== StatusesMap[0] ?
                        <button
                            className='Status-action'
                            onClick={this._moveToPrevious.bind(this, filtered)}
                        >
                            Return back
                        </button> : null
                    }
                    {filtered.status !== StatusesMap[2] ?
                        <button
                            className='Status-action'
                            onClick={this._moveFurther.bind(this, filtered)}
                        >
                            Move further
                        </button> : null
                    }
                </div>
            </li>
        )
    }
}

export default PersonnelCard
