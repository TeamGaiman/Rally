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
      email: '',
      password: ''
    };

    this.renderEmailInput = this.renderEmailInput.bind(this);
    this.renderPassword = this.renderPassword.bind(this);
    this.googleSignIn = this.googleSignIn.bind(this);
  }

  renderEmailInput(e) {
    e.preventDefault();
    this.setState({email: e.target.value});
  }

  renderPassword(e) {
    e.preventDefault();
    this.setState({password: e.target.value});
  }

  googleSignIn() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
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
            <Col sm={4}>
              <FormControl type="username" placeholder="Email" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col sm={2}>
              Password
            </Col>
            <Col sm={4}>
              <FormControl type="password" placeholder="Password" />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={4}>
              <Button type="submit">Sign in</Button>
            </Col>
          </FormGroup>
        </Form>

        <Button onClick={this.googleSignIn}>Log in with Google</Button>
      </div>
    );
  }
}


export default Login;