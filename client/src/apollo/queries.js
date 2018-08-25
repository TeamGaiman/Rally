import gql from 'graphql-tag';

const GET_ALL_USERS = gql`
  {
    getAllUsers{
      id
      name
      fullName
      phoneNumber
      email
      image
      elo
      tier
    }
  }
`;

const GET_USERS_BY_TIER = gql`
  query GetUsersByTier($tier: Int) {
    getUsersByTier(tier: $tier){
      id
      email
      name
      fullName
      phoneNumber
      image
      elo
      wins
      losses
      tier
    }
  }
`;

const MATCH = `
  {
    id
    location
    challenger
    opponent
    startTime
    winner
    score
    court {
      location
      name
      phoneNumber
      numberOfCourts
      indoor
      courtType
      latitude
      longitude
    }
  }
`;

const GET_USER_BY_EMAIL = gql`
  query GetUserByEmail($email: String!) {
    getUserByEmail(email: $email) {
      email
      name
      fullName
      phoneNumber
      wins
      losses
      elo
      tier
      completedMatches
        ${MATCH}
      pendingMatches
        ${MATCH}
      challengesSent
        ${MATCH}
      challengesReceived
        ${MATCH}
    }
  }
`;

const CHECK_EMAIL_IS_UNIQUE = gql`
  query CheckEmailIsUnique($email: String!) {
    checkEmailIsUnique(email: $email)
  }
`;

const GET_CHALLENGES_BY_USER = gql`
  query GetChallengesByUser($email: String) {
    getChallengesByUser(email: $email) {
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
  GET_CHALLENGES_BY_USER 
};
