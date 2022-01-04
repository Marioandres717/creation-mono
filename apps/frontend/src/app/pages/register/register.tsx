import Layout from '../../components/layout/layout';
import styles from './register.module.css';

import { FormEvent, useState } from 'react';
import { gql, useMutation, ApolloError } from '@apollo/client';
import { GraphQLError } from 'graphql';
import { useHistory } from 'react-router-dom';
import { format } from 'path';

type RegisterError = {
  message: string;
  statusCode: number;
};

const ErrorMessage = ({ error }: { error: RegisterError }) => {
  switch (error.statusCode) {
    case 401: {
      return <div className={styles.error}>Invalid Form</div>;
    }
    default: {
      return null;
    }
  }
};
const SIGN_UP = gql`
  mutation createUser($password: String!, $username: String!, $email: String!) {
    signUp(user: { username: $username, email: $email }, password: $password) {
      id
      email
      username
      isActive
    }
  }
`;

const Register = () => {
  const history = useHistory();
  const [form, setform] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });
  const [error, setError] = useState<RegisterError | undefined>();
  const [newUser] = useMutation(SIGN_UP, {
    onCompleted: () => {
      history.push('/');
    },
    onError: (error: ApolloError) => {
      const graphQLError: GraphQLError = error.graphQLErrors[0];
      setError(graphQLError?.extensions?.response || error?.message);
    },
  });

  const updateform = (value: string, type: string) => {
    setform({ ...form, ...{ [type]: value } });
  };
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    newUser({ variables: form });
  };

  return (
    <Layout className={styles.register}>
      {error && <ErrorMessage error={error} />}
      <div className={styles['form-wrapper']}>
        <form className={styles.form} onSubmit={onSubmit} action="/">
          <h1 className={styles.title}>Register </h1>
          <label htmlFor="name" className={styles.label}>
            User-Name
          </label>
          <input
            type="text"
            id="username"
            placeholder="User01"
            className={styles.input}
            onChange={(e) => {
              updateform(e.target.value, 'username');
            }}
          />

          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Client@example.com"
            className={styles.input}
            onChange={(e) => {
              updateform(e.target.value, 'email');
            }}
          />

          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="*********"
            className={styles.input}
            onChange={(e) => {
              updateform(e.target.value, 'password');
            }}
          />

          <label htmlFor="password" className={styles.label}>
            confirm Password
          </label>
          <input
            type="password"
            id="password2"
            placeholder="*********"
            className={styles.input}
            onChange={(e) => {
              updateform(e.target.value, 'password2');
            }}
          />
          <div>
            {form.password2.length > 0
              ? form.password2 !== form.password
                ? 'the password must be the same'
                : 'Correct'
              : null}
          </div>
          <input
            className={
              form.password2 !== form.password ? styles.disabled : styles.active
            }
            type="submit"
            value="Create Account"
            disabled={form.password2 !== form.password}
          />
        </form>
      </div>
    </Layout>
  );
};
export default Register;
