import React from 'react';
import { Table, Button } from 'react-bootstrap';
import moment from 'moment';
import { Mutation } from 'react-apollo';

import { UPDATE_MATCH } from '../apollo/mutations';
import ResultsModal from './ResultsModal.jsx';

class ScheduledMatches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [],
      resultsModalOpen: false,
      matchClicked: '',
      selectedWinner: 'test'
    };

    this.handleMatchClick = this.handleMatchClick.bind(this);
    this.handleWinner = this.handleWinner.bind(this);
    this.hideResultsModal = this.hideResultsModal.bind(this);
  }

  componentDidMount () {
    console.log(this.props.playerData);
    let {pendingMatches, completedMatches } = this.props.playerData;
    let matches = pendingMatches.concat(completedMatches);

    this.setState({
      matches
    });
  }

  handleMatchClick ( match ) {
    this.setState({
      resultsModalOpen: true,
      matchClicked: match
    });
  }

  handleWinner ( winner ) {
    //State should update to reflect winner in matches array too
    console.log('handleWinner', winner);
    this.setState({ 
      winner
    }, console.log('state ', this.state.winner));
  }

  hideResultsModal () {
    this.setState({ 
      resultsModalOpen: false
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
                  <td>{ match.completed ? 'Complete' : 'Scheduled'}</td>
                  <td>
                    { match.completed ?
                      match.winner
                      :
                      <Button 
                        bsStyle="primary" 
                        onClick={ () => this.handleMatchClick( match )}
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

        <ResultsModal
          match={ this.state.matchClicked }
          resultsModalOpen={ this.state.resultsModalOpen }
          hideResultsModal={ this.hideResultsModal }
          matchClicked={ this.state.matchClicked }
          handleWinner = { this.handleWinner }
        />
    
      </div>
    );
  }
}

export default ScheduledMatches;
