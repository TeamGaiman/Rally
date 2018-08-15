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

//work in progress
export const addUser = gql `
mutation ($id: String!, $name: String!, $fullName: String!, $email: String!, $phoneNumber: String!, $wins: Number!, $losses: Number!, $elo: Number!, $tier: Number!, $joinDate: String!, $userNumber: Number!) {
  addUser(id: $id, name: $name, fullName: $fullName, email: $email, phoneNumber: $phoneNumber, wins: $wins, losses: $losses, elo: $elo, tier: $tier, joinDate: $joinDate, userNumber: $userNumber) @ client {
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