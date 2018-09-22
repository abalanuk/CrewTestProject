import React, { PureComponent } from 'react';
import Filters from './Filters'

class ProspectiveCrew extends PureComponent {
  render() {
    return (
      <div>
        <Filters/>
        <p>{this.props.data}</p>
      </div>
    );
  }
}

export default ProspectiveCrew;
