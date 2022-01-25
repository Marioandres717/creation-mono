import { SetStateAction, useState } from 'react';
import Layout from '../../components/layout/layout';
import TransactionDetails from '../../components/transactionDetails/transactionDetails';
import Transactions from '../../components/transactions/transactions';
import styles from './home.module.css';

const Home = () => {
  const [transactionId, setTransactionId] = useState('');
  const onTransactionSelect = (id: string) => {
    setTransactionId(id);
  };
  return (
    <Layout className={styles.layout}>
      <Transactions onSelect={onTransactionSelect} />

      <TransactionDetails id={transactionId} />
    </Layout>
  );
};

export default Home;
