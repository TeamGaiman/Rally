import React from 'react';
import { Form, FormGroup, FormControl, Col, Button } from 'react-bootstrap';

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
    this.handleUsename = this.handleUsername.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handlePhone = this.handlePhone.bind(this);
  }

  handleUsername(e) {
    console.log(e.target.value);
    this.setState({username: e.target.value});
  }

  handleEmail(e) {
    console.log(e.target.value);
    this.setState({email: e.target.value});
  }


  handlePassword(e) {
    console.log(e.target.value);
    this.setState({password: e.target.value});
  }
  handlePhone(e) {
    console.log(e.target.value);
    this.setState({phone: e.target.value});
  }


  // handleSubmit() {
  //   //graphQL requests
  // }


  render() {
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

          <FormGroup controlId="formHorizontalUsername" >
            <Col sm={2}>
              Phone Number
            </Col>
            <Col sm={4}>
              <FormControl type="username" placeholder="Phone Number" />
            </Col>
          </FormGroup>
          
          <FormGroup controlId="formHorizontalEmail" >
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
              <Button type="submit">Submit</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}


export default Signup;