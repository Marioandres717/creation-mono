import { Category, Transaction } from '@creation-mono/shared/types';
import { useState } from 'react';
import Layout from '../../components/layout/layout';
import Navbar from '../../components/navbar/navbar';
import TransactionsByCategory from '../../components/transactionByCategory/transactionByCategory';
import TransactionDetails from '../../components/transactionDetails/transactionDetails';
import Transactions from '../../components/transactions/transactions';
import TransactionsLineChart from '../../components/transactionsLineChart/transactionLineChart';
import styles from './home.module.css';

const Home = () => {
  const [transactionId, setTransactionId] = useState('');
  const [transactionsData, setTransactionsData] = useState<Transaction[]>([]);
  const [categoriesData, setCategoriesData] = useState<Category[]>([]);
  const onTransactionSelect = (id: string) => {
    setTransactionId(id);
  };
  const getTransactionData = (transaction: Transaction[]) => {
    setTransactionsData(transaction);
  };
  const getCategoriesData = (categories: Category[]) => {
    setCategoriesData(categories);
  };

  return (
    <Layout className={styles.layout}>
      <Navbar />

      <Transactions
        onSelect={onTransactionSelect}
        transactionsData={getTransactionData}
        categoriesData={getCategoriesData}
      />
      <div className={styles.container}>
        <TransactionDetails id={transactionId} categories={categoriesData} />

        <TransactionsLineChart transactionsData={transactionsData} />

        <TransactionsByCategory
          transactions={transactionsData}
          categories={categoriesData}
        />
      </div>
    </Layout>
  );
};

export default Home;
