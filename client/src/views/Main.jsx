import React from 'react';
import App from '../components/App.jsx';


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        This is the 'Main' component
        <App />
      </div>
    );
  }
}


export default Main;