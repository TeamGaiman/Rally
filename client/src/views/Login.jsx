import React from 'react';
import {
  Form,
  FormGroup,
  FormControl,
  Col,
  Checkbox,
  Button

} from 'react-bootstrap';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      email: '',
      password: ''
    };
    this.renderEmailInput = this.renderEmailInput.bind(this);
    this.renderPassword = this.renderPassword.bind(this);
  }

  renderEmailInput(e) {
    e.preventDefault();
    console.log(e.target.value);
    this.setState({email: e.target.value});
  }

  renderPassword(e) {
    e.preventDefault();
    console.log(e.target.value);
    this.setState({password: e.target.value});
  }

  render() {
    return (
      <div>
        <h3>Login</h3>
        <Form horizontal>
          <FormGroup controlId="formHorizontalLogin" >
            <Col sm={2}>
              Email
            </Col>
            <Col sm={10}>
              <FormControl type="username" placeholder="Email" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col sm={2}>
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
      </div>
    );
  }
}


export default Login;