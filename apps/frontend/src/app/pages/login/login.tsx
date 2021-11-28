import Layout from '../../components/layout/layout';
import styles from './login.module.css';

import { FormEvent } from 'react';
import { gql, useLazyQuery } from '@apollo/client';

const SIGNIN_QUERY = gql`
  query Login($id: String) {
    login(user: { id: $id })
  }
`;

const Login = () => {
  const [signIn, { loading, error, data }] = useLazyQuery(SIGNIN_QUERY);
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: get form data
    signIn({
      variables: { id: '1' },
    });
  };
  /**
   * TODO: keep an eye on multiple renders fired on submit
   * console.log(data);
   */
  return (
    <Layout className={styles.login}>
      <div className={styles['form-wrapper']}>
        <form className={styles.form} onSubmit={onSubmit}>
          <h1 className={styles.title}>Sign In</h1>
          <label htmlFor="email">
            <input
              id="email"
              type="email"
              autoComplete="username"
              placeholder="Email"
              required
            ></input>
          </label>
          <label className={styles['input-name']} htmlFor="password">
            <input
              id="current-password"
              type="password"
              autoComplete="current-password"
              placeholder="Password"
              required
            ></input>
          </label>
          <input type="submit" value="Login" />
        </form>
      </div>
    </Layout>
  );
};

export default Login;
