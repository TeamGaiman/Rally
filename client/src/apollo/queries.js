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
      wins
      losses
    }
  }
`;

const GET_USER_BY_EMAIL = gql`
  query GetUserByEmail($email: String!) {
    getUserByEmail(email: $email) {
      id
      name
      fullName
      phoneNumber
      email
      elo
      wins
      losses
    }
  }
`;

const CHECK_EMAIL_IS_UNIQUE = gql`
  query CheckEmailIsUnique($email: String!) {
    checkEmailIsUnique(email: $email)
  }
`;

const GET_USER_CHALLENGES = gql`
  query GetUserChallenges($email: String) {
    getUserChallenges(email: $email) {
      id
      accepted
      completed
      participantA
      participantB
      location
      startTime
    }
  }
`;  

module.exports = {
  GET_ALL_USERS,
  GET_USERS_BY_TIER,
  GET_USER_BY_EMAIL,
  CHECK_EMAIL_IS_UNIQUE,
  GET_USER_CHALLENGES 
};
