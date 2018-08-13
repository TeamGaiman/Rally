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
      elo: '',
    };
    this.handleUsename = this.handleUsername.bind(this);
    this.handleElo = this.handleElo.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  handleUsername(e) {
    console.log(e.target.value);
    this.setState({username: e.target.value});
  }

  handleElo(e) {
    console.log(e.target.value);
    this.setState({password: e.target.value});
  }

  handleEmail(e) {
    console.log(e.target.value);
    this.setState({email: e.target.value});
  }


  handlePassword(e) {
    console.log(e.target.value);
    this.setState({password: e.target.value});
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
              Elo
            </Col>
            <Col sm={4}>
              <FormControl type="username" placeholder="Elo" />
            </Col>
          </FormGroup>
          
          <FormGroup controlId="formHorizontalEmail" >
            <Col sm={2}>
              Email (not req)
            </Col>
            <Col sm={4}>
              <FormControl type="username" placeholder="Email" />
            </Col>
          </FormGroup>


          <FormGroup controlId="formHorizontalPassword">
            <Col sm={2}>
              Password (not req)
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