import Layout from '../../components/layout/layout';
import styles from './login.module.css';

import { useState, FormEvent, FC } from 'react';
import { ApolloError, gql, useLazyQuery } from '@apollo/client';
import { GraphQLError } from 'graphql';

import { User } from '@creation-mono/shared/types';
import { Link } from 'react-router-dom';

/**
 * Types
 */
type Props = {
  onLogin: (user: User) => void;
};
type LoginError = {
  message: string;
  statusCode: number;
};
/********** */

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

const ErrorMessage = ({ error }: { error: LoginError }) => {
  switch (error.statusCode) {
    case 401: {
      return <div className={styles.error}>Invalid username and password</div>;
    }
    default: {
      return null;
    }
  }
};

const Login: FC<Props> = ({ onLogin }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState<LoginError | undefined>();
  const [signIn] = useLazyQuery(SIGNIN_QUERY, {
    onCompleted: (data) => {
      if (data.login) {
        onLogin(data.login);
      }
    },
    onError: (error: ApolloError) => {
      // TODO: not all error contain extension.response
      // CORS errors for instance break this function
      const graphQLError: GraphQLError = error.graphQLErrors[0];
      setError(graphQLError?.extensions?.response || error?.message);
    },
  });
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    signIn({
      variables: form,
    });
  };
  const updateForm = (value: string, type: string) => {
    setForm({ ...form, ...{ [type]: value } });
  };
  /**
   * TODO: keep an eye on multiple renders fired on submit
   * console.log(data);
   */
  return (
    <Layout className={styles.login}>
      {error && <ErrorMessage error={error} />}
      <div className={styles['form-wrapper']}>
        <form className={styles.form} onSubmit={onSubmit}>
          <h1 className={styles.title}>Sign In</h1>
          <label htmlFor="email">
            <input
              id="email"
              type="email"
              autoComplete="username"
              placeholder="Email"
              onChange={(e) => {
                updateForm(e.target.value, 'email');
              }}
              required
            ></input>
          </label>
          <label className={styles['input-name']} htmlFor="password">
            <input
              id="current-password"
              type="password"
              autoComplete="current-password"
              placeholder="Password"
              onChange={(e) => {
                updateForm(e.target.value, 'password');
              }}
              required
            ></input>
          </label>
          <input type="submit" value="Login" />
          <Link to="/register" className={styles.link}>
            Create Account
          </Link>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
