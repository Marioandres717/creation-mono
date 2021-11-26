import Layout from '../../components/layout/layout';
import styles from './login.module.css';

const Login = () => {
  return (
    <Layout className={styles.login}>
      <div className={styles['form-wrapper']}>
        <form className={styles.form}>
          <h1 className={styles.title}>Sign In</h1>
          <label htmlFor="username">
            <input
              id="username"
              type="text"
              placeholder="Email"
              required
            ></input>
          </label>
          <label className={styles['input-name']} htmlFor="password">
            <input
              id="password"
              placeholder="Password"
              type="password"
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
