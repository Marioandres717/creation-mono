import { gql } from '@apollo/client';

const SIGNIN_QUERY = gql`
  query Login($password: String!, $email: String) {
    login(user: { email: $email }, password: $password) {
      id
      username
      email
      role
      isActive
    }
  }
`;

const LOGOUT = gql`
  query Logout {
    logout: logout
  }
`;
export { SIGNIN_QUERY, LOGOUT };
