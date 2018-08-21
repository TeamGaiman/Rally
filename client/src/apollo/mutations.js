import gql from 'graphql-tag';

const CREATE_USER = gql`
  mutation CreateUser($email: String!) {
    createUser(input:{email: $email}) {
      email
    }
  }
`;

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
  UPDATE_MATCH
};
