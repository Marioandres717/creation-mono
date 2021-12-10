import Layout from '../../components/layout/layout';
import styles from './register.module.css'

const Register = () => {
  return (
    <Layout className={styles.register}>
      <div className={styles['form-wrapper']}>
        <form className={styles.form} action="">
          <h1>Register page</h1>
          <label htmlFor="name" className="label">
            User-Name
          </label>
          <input
            type="text"
            id="username"
            placeholder="User01"
            className="input input-name"
          />

          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Client@example.com"
            className="input input-email"
          />

          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="*********"
            className="input input-password"
          />
          <button placeholder='Create Account' />
        </form>
      </div>
    </Layout>
  );
};
export default Register;
