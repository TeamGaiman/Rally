import gql from 'graphql-tag';

// USER MUTATIONS
const CREATE_USER = gql`
  mutation CreateUser($input: UserInput) {
    createUser(input: $input)
  }
`;

const UPDATE_USER = gql`
  mutation ($email: String!, $input: UserInput) {
    updateUser(email: $email, input: $input)
  }
`;

// MATCH MUTATIONS
const CREATE_MATCH = gql`
  mutation CreateMatch($input: MatchInput) {
    createMatch(input: $input)
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
mutation UpdateMatch($id: ID!, $input: MatchUpdateInput) {
  updateMatch(id: $id, input: $input)
}
`;

const DELETE_MATCH = gql`
mutation DeleteMatch($id: ID!) {
  deleteMatch(id: $id)
}
`;

module.exports = {
  CREATE_USER,
  UPDATE_USER,
  CREATE_MATCH,
  ACCEPT_MATCH,
  UPDATE_MATCH,
  DELETE_MATCH
};
