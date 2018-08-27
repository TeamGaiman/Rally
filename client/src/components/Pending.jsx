import React from 'react';
import { Table, Button } from 'react-bootstrap';
import moment from 'moment';

class Pending extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: []
    };
  }

  componentDidMount () {
    console.log(this.props.playerData);
    let {pendingMatches, completedMatches } = this.props.playerData;
    let matches = pendingMatches.concat(completedMatches);

    this.setState({
      matches
    });
  }

  render () {
    return (
      <div className="matches-container">
        <h2>Scheduled Matches</h2>
        <Table striped bordered condensed hover>
        
          <thead>
            <tr>
              <th>Opponent</th>
              <th>Date</th>
              <th>Location</th>
              <th>Status</th>
              <th>Winner</th>
            </tr>
          </thead>
  
          <tbody>
            { this.state.matches.map(( match ) => {
              return (
                <tr className="match-row" key={ match.id }>
                  <td>{ match.opponent }</td>
                  <td>{ moment( match.startTime ).calendar() }</td>
                  <td>{ match.location }</td>
                  <td>Complete</td>
                  <td>
                    { match.completed ?
                      match.winner
                      :
                      <Button 
                        bsStyle="primary" 
                        onClick={ () => console.log('clicked') }
                      >
                        Add Results
                      </Button>
                    }
                  </td>
                </tr>
              );
            })}
          </tbody>
  
        </Table>
      </div>
    );
  }
}

export default Pending;
