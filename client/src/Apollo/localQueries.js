import gql from 'graphql-tag';

const CHECK_EMAIL_IS_UNIQUE = gql `
  query checkEmailIsUnique($email: String!) {
    Boolean
  }
`;

module.exports = {
  CHECK_EMAIL_IS_UNIQUE
};
