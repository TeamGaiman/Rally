import React from 'react';

class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false,
      username: '',
      password: ''
    }
    // this.renderUsenameInput = this.renderUsenameInput.bind(this)
  }

  // renderUsenameInput() {

  // }


  render() {
    return (
      <div>This is the 'Sigup' component
      <input onChange={ this.renderUsenameInput }>
      </input>
      <button></button>
      </div>
    );
  }
}


export default Signup;