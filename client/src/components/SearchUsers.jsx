import React from 'react';
import Autocomplete from 'react-autocomplete';

class SearchUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textField: ''
    };
  }

  render() {
    return (
      <div>
        <Autocomplete
          getItemValue={(item) => item.label}
          items={this.props.allUsers || ['loading']}
          renderItem={(item, isHighlighted) =>
            <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
              {item.email}
            </div>
          }
          value={this.state.value}
          onChange={(e) => this.state.value = e.target.value}
          onSelect={(val) => this.state.value = val}
        />
      </div>
    )
  }
}

export default SearchUsers;
