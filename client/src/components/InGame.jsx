import React from 'react';
import ScoreCard from './ScoreCard.jsx';
import {
  Button,
  Modal
} from 'react-bootstrap';

class InGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false
    };
    this.handleHide = this.handleHide.bind(this);
  }

  handleHide() {
    this.setState({ submitted: false });
  }

  render() {
    return (
      <div>
        This is the 'InGame' component
        <ScoreCard />
        <Button onClick={() => this.setState({ submitted: true })}>
          Submit
        </Button>
        <Modal
          show={this.state.submitted}
          onHide={this.handleHide}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">
              Post-Game Modal
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Test text in modal
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}


export default InGame;