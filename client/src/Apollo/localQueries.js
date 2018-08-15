import gql from 'graphql-tag';

//set basic query
//adding @client makes this query our client cache instead of server
export const getUserInfo = gql `
  query {
    currentUser @ client {
    id
    name
    fullName
    email
    phoneNumber
    wins
    losses
    elo
    tier
    joinDate
    userNumber
    }
  }
`;