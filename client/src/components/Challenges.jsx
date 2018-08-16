import React from 'react';
import { Table } from 'react-bootstrap';

class Challenges extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [
        {particpantB: 'TopSpin1', startTime: '2018-010-29 04:00:00', location: 'Battery Park', id: 1},
        {particpantB: 'DeuceLove', startTime: '2019-010-29 05:00:00', location: 'Sunset Park', id: 2},
        {particpantB: 'SliceMaster55', startTime: '2019-010-29 06:00:00', location: 'Sunset Park', id: 3},
      ],
      matchClick: false,
      matchClickId: null,
    };

    this.handleMatchClick = this.handleMatchClick.bind(this);
  }

  getAllChallenges() {

  }

  handleMatchClick( e ) {
    this.setState({
      matchClick: true,
      matchClickId: e.target.value
    });
  }

  // handle

  render() {
    return (
      <div>
        <h2>Challenges</h2>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>User</th>
              <th>Date</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody onClick={ this.handleMatchClick }>
            {this.state.matches.map(match => (
              <tr key={ match.id } value={ match.id }>
                <td>{ match.particpantB }</td>
                <td>{ match.startTime }</td>
                <td>{ match.location }</td>
              </tr>
            ))}
          </tbody>
          {() => {
            if (this.state.matchClick) {
              return <div className="static-modal">
                <Modal.Dialog>
                  {/* <Modal.Header>
                    <Modal.Title></Modal.Title>
                  </Modal.Header> */}
                  <Modal.Body>
                    <Button bsStyle="primary">Accept</Button>
                    <Button>Decline</Button>
                  </Modal.Body>
                </Modal.Dialog>
              </div>;
            } else {
              return null;
            }
          }}
        </Table>
      </div>
    );
  }
}


export default Challenges;