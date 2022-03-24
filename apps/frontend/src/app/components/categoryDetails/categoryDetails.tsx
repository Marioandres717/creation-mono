import { useLazyQuery } from '@apollo/client';
import { Transaction } from '@creation-mono/shared/types';
import { GET_TRANSACTION_CATEGORIES } from '../../services/transactions';
import { useEffect } from 'react';
import styles from './categoryDetails.module.css';
import { useHistory } from 'react-router-dom';

const CategoryDetails = ({ id }: Transaction) => {
  const [getTransaction, { data }] = useLazyQuery(GET_TRANSACTION_CATEGORIES);
  const historyStateId = useHistory().location.state;

  useEffect(() => {
    if (id) {
      getTransaction({
        variables: {
          categoryId: id,
        },
      });
    } else if (historyStateId) {
      getTransaction({
        variables: {
          categoryId: historyStateId,
        },
      });
    }
  }, [id, getTransaction, historyStateId]);
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
          </ul>
        );
      })}
    </div>
  );
};
export default CategoryDetails;
