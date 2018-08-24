import gql from 'graphql-tag';

// USER MUTATIONS
const CREATE_USER = gql`
  mutation CreateUser($email: String!) {
    createUser(input:{email: $email})
  }
`;

const UPDATE_USER = gql`
  mutation ($email: String!, $input: UserInput) {
    updateUser(email:$email, input: $input){
      name
      phoneNumber
    }
  }
`;

// MATCH MUTATIONS
const CREATE_MATCH = gql`
  mutation CreateMatch($participantA: String!, $participantB: String!, $startTime: String!, $location: String!) {
    createMatch(input: {
      participantA: $participantA,
      participantB: $participantB,
      startTime: $startTime,
      location: $location
    }){
      participantA
      participantB
      startTime
      location
    }
  }
`;

const ACCEPT_MATCH = gql`
  mutation UpdateMatch($id: ID!, $accepted: Boolean) {
    updateMatch(id: $id, input: { accepted: $accepted }){
      accepted
    }
  }
`;

const UPDATE_MATCH = gql`
mutation UpdateMatch($id: String, $input: MatchInput) {
  updateMatch(id: $id, input: $input) {
    id
    participantA
    participantB
    startTime
    location
    accepted
    completed
    winner
    score
  }
}
`;

module.exports = {
  CREATE_USER,
  UPDATE_USER,
  CREATE_MATCH,
  ACCEPT_MATCH,
  UPDATE_MATCH
};
