import React from 'react';
import { Form, FormGroup, FormControl, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      email: '',
      password: '',
      username: '',
      phone: ''
    };
    this.handleUsername = this.handleUsername.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handlePhone = this.handlePhone.bind(this);

  }

  handleUsername(e) {
    console.log(e.target.value);
    this.setState({ username: e.target.value });
  }

  handleEmail(e) {
    console.log(e.target.value);
    this.setState({ email: e.target.value });
  }

  handlePassword(e) {
    console.log(e.target.value);
    this.setState({ password: e.target.value });
  }
  handlePhone(e) {
    console.log(e.target.value);
    this.setState({ phone: e.target.value });
  }

  // handleSubmit() {
  //   //graphQL requests
  // }

  googleSignUp() {
    var provider = new firebase.auth.GoogleAuthProvider();
    // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    // firebase.auth().useDeviceLanguage();
    // firebase.auth().signInWithRedirect(provider)
    // firebase.auth().getRedirectResult().then(result => {
    //   console.log('RESULT', result)
    //   if (result.credential) {
    //     // This gives you a Google Access Token. You can use it to access the Google API.
    //     var token = result.credential.accessToken;
    //   }
    //   // The signed-in user info.
    //   var user = result.user;
    // }).catch(error => {
    //   // Handle Errors here.
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    //   // The email of the user's account used.
    //   var email = error.email;
    //   // The firebase.auth.AuthCredential type that was used.
    //   var credential = error.credential;
    //   // ...
    // });
    firebase.auth().signInWithPopup(provider).then(function (result) {
      console.log('GOOGLE SIGN IN RESULT', result);
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  render() {
    if (this.props.loggedIn) {
      return (
        <div>
          <h3>Signup</h3>
          <Form horizontal>
            <FormGroup controlId="formHorizontalUsername" >
              <Col sm={2}>
                Username
              </Col>
              <Col sm={4}>
                <FormControl type="username" placeholder="Username" />
              </Col>
            </FormGroup>

            <FormGroup  >
              <Col sm={2}>
                Phone Number
              </Col>
              <Col sm={4}>
                <FormControl placeholder="Phone Number" />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalEmail" >
              <Col sm={2}>
                Email
              </Col>
              <Col sm={4}>
                <FormControl placeholder="Email" />
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
              <Link to='/matchmaker'>
                <Button type="submit">Submit</Button>
              </Link>
              </Col>
            </FormGroup>
          </Form>
        </div>
      );
    } else {
      return null;
    }
  }
}


export default Signup;