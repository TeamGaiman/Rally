import gql from 'graphql-tag';

// ¡UNTESTED!
const CREATE_NEW_USER = gql`
  {
    createUser($email: String!) {
      email
    }
  }
`;
// ¡UNTESTED MUTATION NOT EXPORTED!
module.exports;
