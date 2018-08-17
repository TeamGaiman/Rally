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

const CHECK_EMAIL_IS_UNIQUE = gql`
  query CheckEmailIsUnique($email: String) {
    checkEmailIsUnique(email: $email){
      Boolean
    }
  }
`;

module.exports = {
  GET_ALL_USERS,
  GET_USERS_BY_TIER,
  CHECK_EMAIL_IS_UNIQUE
};
