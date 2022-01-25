import { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Transaction } from '@creation-mono/shared/types';
import { useEffect } from 'react';
import { GET_TRANSACTION } from '../../services/transactions';
import styles from './transactionDetails.module.css';

const TransactionDetails = ({ id }: Transaction) => {
  const [transaction, setTransactionsDetails] = useState<Transaction>();
  const [getTransaction] = useLazyQuery(GET_TRANSACTION, {
    onCompleted: (data) => {
      const { transactions } = data;
      setTransactionsDetails(transactions[0]);
    },
  });

  let transactionTemplate = <div></div>;
  if (transaction?.id) {
    transactionTemplate = (
      <div className={styles.transaction_details}>
        <ul className={styles.list_container} key={transaction.id}>
          <li className={styles.list}>
            <span className={styles.title}>Descripción</span>
            <span className={styles.subtitle}>{transaction.description}</span>
          </li>
          <li className={styles.list}>
            <span className={styles.title}>Valor</span>
            <span className={styles.subtitle}>$ {transaction.amount}</span>
          </li>
          <li className={styles.list}>
            <span className={styles.title}>Fecha y Hora</span>
            <span className={styles.subtitle}>
              {transaction.date.slice(0, 10)}
            </span>
            <span className={styles.subtitle}>
              {transaction.date.slice(11, 19)}
            </span>
          </li>
          <li className={styles.list}>
            <span className={styles.title}>Tipo</span>
            <span className={styles.subtitle}>{transaction.type}</span>
          </li>
          <li className={styles.list_r}>
            <span className={styles.title}>Categoría</span>
            <span className={styles.subtitle}>
              {transaction.category?.name}
            </span>
          </li>
        </ul>
      </div>
    );
  }

  useEffect(() => {
    if (id) {
      getTransaction({ variables: { id } });
    }
  }, [id, getTransaction]);

  return (
    <div className={styles.transaction_details}>{transactionTemplate}</div>
  );
};
export default TransactionDetails;
