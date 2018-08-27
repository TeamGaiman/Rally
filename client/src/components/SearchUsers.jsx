import React from 'react';
import Autosuggest from 'react-autosuggest';
import Mutation from 'react-apollo';

import { CREATE_MATCH } from '../apollo/mutations.js';

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
    this.setState({
      value: newValue
    });
  }

  escapeRegexCharacters (str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  
  getSuggestions (value) {
    const escapedValue = this.escapeRegexCharacters(value.trim());
    if (escapedValue === '') {
      return [];
    }
  
    const regex = new RegExp('^' + escapedValue, 'i');
  
    return this.props.allUsers.filter( user => (
      regex.test ( user.email )
        || regex.test( user.name )
        || regex.test( user.fullName )
    ));
  }
  
  getSuggestionValue (suggestion) {
    return suggestion.name;
  }
  
  renderSuggestion ( suggestion ) {
    return (
      <span>
        {(suggestion.email)
          ? <span><strong>Email: </strong> {suggestion.email}</span>
          : null}
        {(suggestion.name)
          ? <span><strong> Username: </strong> {suggestion.name}</span>
          : null}
        {(suggestion.fullName)
          ? <span><strong> Full Name: </strong> {suggestion.fullName}</span>
          : null}
      </span>
    );
  }

  onSuggestionsFetchRequested ({ value }) {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
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
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps} />
    );
  }
}

export default SearchUsers;
