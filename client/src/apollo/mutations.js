import gql from 'graphql-tag';

// ¡UNTESTED!
const CREATE_USER = gql `
  mutation CreateUser($email: String!) {
    createUser(input:{email: $email}) {
      email
    }
  }
`;

const CREATE_MATCH = gql `
  mutation ($participantA: String!, $participantB: String!, $startTime: String!, $location: String!) {
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

const UPDATE_USER = gql `
mutation ($email: String!, $name: String!, $fullName: String!, $phoneNumber: String!){
  updateUser(email: $email, input: {
      name: $name,
      fullName: $fullName
      phoneNumber: $phoneNumber
    }){
      name
    }
  }
`;


// ¡UNTESTED MUTATION NOT EXPORTED!
module.exports = {
  CREATE_USER,
  CREATE_MATCH,
  UPDATE_USER
};
