import { useLazyQuery } from '@apollo/client';
import { Transaction } from '@creation-mono/shared/types';
import { useEffect } from 'react';
import { GETTRANSACTION } from '../../services/transactions';
import styles from './transactionDetails.module.css';

const TransactionDetails = ({ id }: Transaction) => {
  const [getTransaction, { data }] = useLazyQuery(GETTRANSACTION);

  useEffect(() => {
    if (id === undefined) {
      return;
    } else {
      getTransaction({
        variables: {
          id: id,
        },
      });
    }
  }, [id]);

  return (
    <div className={styles.transaction_details}>
      {data?.transactions.map((transaction: Transaction) => {
        return (
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
                {transaction.date.slice(0, 19)}
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
        );
      })}
    </div>
  );
};
export default TransactionDetails;
