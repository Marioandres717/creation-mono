import { useLazyQuery } from '@apollo/client';
import { Transaction } from '@creation-mono/shared/types';
import { useEffect } from 'react';
import { GETTRANSACTION } from '../../services/transactions';
import styles from './transactionCards.module.css';
const TransactionCards = () => {
  const [getTransaction, { data }] = useLazyQuery(GETTRANSACTION);
  useEffect(() => {
    getTransaction();
  }, []);
  return (
    <div className={styles.cards}>
      {data &&
        data.transactions &&
        data.transactions.map((transaction: Transaction) => {
          return (
            <div key={transaction.id}>
              <ul className={styles.card}>
                <li>{transaction.description}</li>
                <li>{transaction.amount}</li>
                <li>{transaction.type}</li>
                <li>{transaction.date}</li>
              </ul>
            </div>
          );
        })}
    </div>
  );
};
export default TransactionCards;
