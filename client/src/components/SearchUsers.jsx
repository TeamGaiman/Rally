import React from 'react';
import Autocomplete from 'react-autocomplete';
import Mutation from 'react-apollo';

import { CREATE_MATCH } from '../apollo/mutations.js';

class SearchUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textField: '',
      selectedUser: null
    };
  }

  handleBrowseUsers ( user ) {
    console.log( user );
    this.setState({
      selectedUser: user
    });
  }

  render() {
    return (
      <div>
        { this.props.allUsers
          ? <Autocomplete
            getItemValue={ item => this.handleBrowseUsers( item )}
            items={ this.props.allUsers || ['loading'] }
            renderItem={(item, isHighlighted) =>
              <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                { item.name }:  { item.email }
              </div>
            }
            value={this.state.textField}
            onChange={ e => this.state.textField = e.target.value}
            onSelect={ () => 
              this.props.handleMatchClick( this.state.selectedUser )
            }
          />
          : null
        }
      </div>
    );
  }
}

export default SearchUsers;
