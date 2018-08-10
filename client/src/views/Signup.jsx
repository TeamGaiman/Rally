import React from 'react';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      username: '',
      password: ''
    };
    // this.renderUsenameInput = this.renderUsenameInput.bind(this)
  }

  // renderUsenameInput() {

  // }


  render() {
    return (

      <Form horizontal>
        <FormGroup >
          <Col sm={2}>
            Username
          </Col>
          <Col sm={10}>
            <FormControl type="email" placeholder="Email" />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} sm={2}>
            Password
          </Col>
          <Col sm={10}>
            <FormControl type="password" placeholder="Password" />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Checkbox>Remember me</Checkbox>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button type="submit">Sign in</Button>
          </Col>
        </FormGroup>
      </Form>



    // <div>This is the 'Sigup' component
    // <input onChange={ this.renderUsenameInput }>
    // </input>
    // <button></button>
    // </div>
    );
  }
}


export default Signup;