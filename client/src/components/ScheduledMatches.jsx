import React from 'react';
import { Table, Button } from 'react-bootstrap';
import moment from 'moment';

import ResultsModal from './ResultsModal.jsx';

class ScheduledMatches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resultsModalOpen: false,
      matchClicked: '',
      selectedWinner: ''
    };

    this.handleMatchClick = this.handleMatchClick.bind(this);
    this.hideResultsModal = this.hideResultsModal.bind(this);
  }

  handleMatchClick ( match ) {
    this.setState({
      resultsModalOpen: true,
      matchClicked: match
    });
  }

  hideResultsModal () {
    this.setState({ 
      resultsModalOpen: false
    });
  }

  render () {
    let combinedMatches = this.props.scheduledMatches.pendingMatches
      .concat( this.props.scheduledMatches.completedMatches );

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
            { combinedMatches.map(( match, index ) => {
              return (
                <tr className="match-row" key={ index }>
                  <td>{ match.opponent }</td>
                  <td>{ moment( new Date( match.startTime )).calendar() }</td>
                  <td>{ match.location }</td>
                  <td>{ match.completed ? 'Complete' : 'Scheduled'}</td>
                  <td>
                    { match.completed ?
                      match.winner
                      :
                      <Button 
                        bsStyle="primary" 
                        value={ index }
                        onClick={ ( e ) => this.handleMatchClick( match )}
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
          handleSubmission = { this.handleSubmission }
        />
    
      </div>
    );
  }
}

export default ScheduledMatches;
