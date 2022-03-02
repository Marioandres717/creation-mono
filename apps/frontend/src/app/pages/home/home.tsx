import { Transaction } from '@creation-mono/shared/types';
import { useState } from 'react';
import Layout from '../../components/layout/layout';
import Navbar from '../../components/navbar/navbar';
import TransactionDetails from '../../components/transactionDetails/transactionDetails';
import Transactions from '../../components/transactions/transactions';
import TransactionsLineChart from '../../components/transactionsLineChart/transactionLineChart';
import styles from './home.module.css';

const Home = () => {
  const [transactionId, setTransactionId] = useState('');
  const [transactionsData, setTransactionsData] = useState<Transaction[]>([]);
  const onTransactionSelect = (id: string) => {
    setTransactionId(id);
  };
  const getTransactionData = (transaction: Transaction[]) => {
    setTransactionsData(transaction);
  };
  return (
    <Layout className={styles.layout}>
      <Navbar />

      <Transactions
        onSelect={onTransactionSelect}
        transactionsData={getTransactionData}
      />
      <div className={styles.container}>
        <TransactionDetails id={transactionId} />

        <TransactionsLineChart transactionsData={transactionsData} />
      </div>
    </Layout>
  );
};

export default Home;
