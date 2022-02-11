import { useState } from 'react';
import Layout from '../../components/layout/layout';
import Navbar from '../../components/navbar/navbar';
import TransactionDetails from '../../components/transactionDetails/transactionDetails';
import Transactions from '../../components/transactions/transactions';
import TransactionsLineChart from '../../components/transactionsLineChart/transactionLineChart';
import styles from './home.module.css';

const Home = () => {
  const [transactionId, setTransactionId] = useState('');
  const onTransactionSelect = (id: string) => {
    setTransactionId(id);
  };
  return (
    <Layout className={styles.layout}>
      <Navbar />

      <Transactions onSelect={onTransactionSelect} />

      <TransactionDetails id={transactionId} />

      <TransactionsLineChart />
    </Layout>
  );
};

export default Home;
