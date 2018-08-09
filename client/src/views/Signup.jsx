import React from 'react';
import {
  Form,
  FormGroup,
  FormControl,
  Col

} from 'react-bootstrap';

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

      <div>
      <h3>Signup</h3>
      <Form horizontal>
        <FormGroup >
          <Col sm={2}>
            Username
          </Col>
          <Col sm={10}>
            <FormControl type="username" placeholder="Username" />
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


export default Signup;