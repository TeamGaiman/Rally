import React from 'react';
import { Table, Button, Image } from 'react-bootstrap';
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
      matchClicked: match,
      resultsModalOpen: true
    });
  }

  hideResultsModal () {
    this.setState({ 
      resultsModalOpen: false
    });
  }

  render () {
    let combinedMatches = this.props.scheduledMatches.pendingMatches
      .concat( this.props.scheduledMatches.completedMatches )
      .sort (( a, b ) => {
        return new Date(b.startTime) - new Date(a.startTime);
      });
      
    return (
      <div>
        <h2>Scheduled Matches</h2>
        <Table striped bordered condensed hover>

          <thead>
            <tr>
              <th>Opponent</th>
              <th>Details</th>
              <th>Status</th>
              <th>Winner</th>
            </tr>
          </thead>

          <tbody>
            { combinedMatches.map(( match, index ) => {
              if (this.props.currentUser === match.opponent) {
                var matchOpponent = match.challengerUserInfo;
              } else {
                var matchOpponent = match.opponentUserInfo;
              } 
              return (
                <tr className="match-row" key={ index }>
                  <td className="align-middle">
                    <Image
                      src={ matchOpponent.image }
                      className="profile-pic-card-scheduled pic-shadow" circle /> 
                    <br/>
                    { matchOpponent.name || matchOpponent.fullName }
                  </td>
                  <td 
                    className="clickable-td"
                    onClick={ () => {
                      this.props.handleChallengeClicked( match );
                      this.props.toggleChallengeModal();
                    }}>
                    { moment( new Date( match.startTime )).calendar()}
                    <br/>
                    { match.location }
                  </td>
                  <td>{ match.completed ? 'Complete' : match.winner ? 'Awaiting Confirmation' : 'Scheduled'}</td>
                  <td>
                    {( match.completed )
                      ?
                      <p>{match.winner}</p>
                      :
                      <Button 
                        bsStyle="primary" 
                        value={ index }
                        onClick={ ( e ) => this.handleMatchClick( match )}
                        disabled ={ new Date( match.startTime ) > new Date() ? true : false}
                      >
                        { match.winner ? 'Confirm Winner' : 'Add Winner' }
                      </Button>
                    }
                  </td>
                </tr>
              );
            })}
          </tbody>
  
        </Table>

        <ResultsModal
          currentUser={ this.props.currentUser }
          currentElo={ this.props.currentElo }
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
