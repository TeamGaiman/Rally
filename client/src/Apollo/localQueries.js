import gql from 'graphql-tag';

const GET_ALL_USERS = gql`
  {
    getAllUsers{
      id
      name
      fullName
      phoneNumber
      email
      elo
    }
  }
`;

const GET_USERS_BY_TIER = gql`
  query GetUsersByTier($tier: Int) {
    getUsersByTier(tier: $tier){
      id
      name
      fullName
      phoneNumber
      email
      elo
    }
  }
`;

module.exports = {
  GET_ALL_USERS,
  GET_USERS_BY_TIER
};
