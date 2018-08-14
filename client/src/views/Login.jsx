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
    this.onSignIn = this.onSignIn.bind(this);
    this.signOut = this.signOut.bind(this);
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

  onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }

  signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut()
      .then(() => console.log('User signed out.'));
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
        <div className="g-signin2" data-onsuccess="onSignIn"></div>

        <a href="#" onClick={this.signOut}>Sign out</a>

      </div>
    );
  }
}


export default Login;