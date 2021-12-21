import Layout from '../../components/layout/layout';
import styles from './register.module.css';

import { FormEvent, useState } from 'react';
import { gql, useMutation, ApolloError } from '@apollo/client';
import { GraphQLError } from 'graphql';

type LoginError = {
  message: string;
  statusCode: number;
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
  const [form, setform] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState<LoginError | undefined>();
  const [newUser] = useMutation(SIGN_UP, {
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
    console.log(form);
  };
  return (
    <Layout className={styles.register}>
      <div className={styles['form-wrapper']}>
        <form className={styles.form} onSubmit={onSubmit}>
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
          <input type="submit" value="Create Account" />
        </form>
      </div>
    </Layout>
  );
};
export default Register;
