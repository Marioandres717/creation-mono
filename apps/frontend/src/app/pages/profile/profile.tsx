import Layout from '../../components/layout/layout';
import styles from './profile.module.css';
const Profile = () => {
  return (
    <Layout className={styles.main}>
      <div className={styles.box1}>Profile Page</div>
      <div className={styles.box2}>Profile Page</div>
      <div className={styles.box3}>
        <div className={styles.boxItem1}>Profile Page</div>
        <div className={styles.boxItem2}>Profile Page</div>
        <div className={styles.boxItem3}>Profile Page</div>
      </div>
    </Layout>
  );
};

export default Profile;
