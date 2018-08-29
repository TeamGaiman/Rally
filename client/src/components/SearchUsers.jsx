import React from 'react';
import Autosuggest from 'react-autosuggest';

class SearchUsers extends React.Component {
  constructor() {
    super();
    this.state = {
      placeholder: 'Search for players by email or username',
      value: '',
      suggestions: [],
    };

    this.onChange = this.onChange.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
  }

  onChange ( event, { newValue, method }) {
    if (newValue.length === 0 ) {
      this.props.getRecommendedOpponents();
    }

    this.setState({
      value: newValue
    });
  }

  escapeRegexCharacters ( str ) {
    return str.replace( /[.*+?^${}()|[\]\\]/g, '\\$&' );
  }
  
  getSuggestions ( value ) {
    const escapedValue = this.escapeRegexCharacters( value.trim() );
    if ( escapedValue === '' ) {
      return [];
    }
  
    const regex = new RegExp( '^' + escapedValue, 'i' );
  
    return this.props.allUsers.filter( user => (
      !(user.email === this.props.loggedInUser)
        && regex.test ( user.email )
        || regex.test( user.name )
        || regex.test( user.fullName )
    ));
  }
  
  getSuggestionValue ( suggestion ) {
    return suggestion.name || suggestion.email;
  }

  onSuggestionsFetchRequested ({ value }) {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
    this.props.updateMatchedUsers( this.getSuggestions(value) );
  }

  onSuggestionsClearRequested () {
    this.setState({
      suggestions: []
    });
  }

  render () {

    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'Search for players...',
      value,
      onChange: this.onChange
    };

    return (
      <Autosuggest 
        suggestions={ this.state.suggestions }
        onSuggestionsFetchRequested={ this.onSuggestionsFetchRequested }
        onSuggestionsClearRequested={ this.onSuggestionsClearRequested }
        getSuggestionValue={ this.getSuggestionValue }
        inputProps={ inputProps }
        //required props by react-autosuggest but not necessary in our case.
        renderSuggestion={ () => { return; } }
        onSuggestionSelected={ () => { return; } }
      />
    );
  }
}

export default SearchUsers;
