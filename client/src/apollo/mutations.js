import gql from 'graphql-tag';

// USER MUTATIONS
const CREATE_USER = gql`
  mutation CreateUser($email: String!) {
    createUser(input:{email: $email}) {
      email
    }
  }
`;

const UPDATE_USER = gql`
  mutation UpdateUser($email: String!, $name: String!, $fullName: String!, $phoneNumber: String!) {
    updateUser(email: $email, input: {
      name: $name,
      fullName: $fullName
      phoneNumber: $phoneNumber
    }){
      name
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
  mutation AcceptMatch($accepted: Boolean) {
    acceptMatch(input: {
      accepted: $accepted
    }){
      accepted
    }
  }
`;

const UPDATE_MATCH = gql`
mutation ($id: String!, $input: MatchInput) {
  updateMatch(id: $id, input: $input) {
    
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
