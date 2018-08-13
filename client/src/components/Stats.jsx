import React from 'react';
import Trophies from './Trophies.jsx';

class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        This is the 'Stats' component
        <Trophies />
      </div>
    );
  }
}


export default Stats;