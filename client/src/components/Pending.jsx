import React from 'react';
import { Table, Button } from 'react-bootstrap';
import moment from 'moment';

class Pending extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [],
      resultsModalOpen: false,
      matchClicked: ''
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

  handleMatchClick ( match ) {
    this.setState({
      resultsModalOpen: true,
      matchClicked: match
    });
  }

  handleWinner ( winner ) {
    //State should update to reflect winner in matches array too
    this.setState({ 
      winner 
    });
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
                  <td>{ match.completed ? 'Complete' : 'In Progress'}</td>
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

        { this.state.challengeModalOpen
          ? (
            <Mutation
              mutation={ UPDATE_MATCH }
              update={ this.handleAccept }
              variables={{
                id: this.state.matchClicked.id,
                input: {
                  completed: true,
                  winner: this.state.winner
                }
              }}
            >
              { updateWinner => (
                <ResultsModal
                  results={ this.state.matchClicked }
                  resultsModalOpen={ this.state.resultsModalOpen }
                  hideResultsModal={ this.hideResultsModal }
                  matchClicked={ this.state.matchClicked }
                  updateWinner={ updateWinner }
                />
              )}
            </Mutation>
          ) : (
            null
          )
        }

      </div>
    );
  }
}

export default Pending;
