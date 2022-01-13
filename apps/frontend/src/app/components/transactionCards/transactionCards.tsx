import { useLazyQuery, useMutation } from '@apollo/client';
import { Transaction } from '@creation-mono/shared/types';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { GETTRANSACTION, DELETETRANSACTION } from '../../services/transactions';
import { Cross2Icon } from '@radix-ui/react-icons';
import * as Tooltip from '@radix-ui/react-tooltip';
import styles from './transactionCards.module.css';
type Nullable<T> = T | null;
const TransactionCards = () => {
  const history = useHistory();
  const [getTransaction, { data }] = useLazyQuery(GETTRANSACTION);
  const [deleteTransaction] = useMutation(DELETETRANSACTION);
  const handleClick = (id: Nullable<string> | undefined) => {
    deleteTransaction({
      variables: {
        id: id,
      },
    });
  };

  useEffect(() => {
    getTransaction();
  }, []);
  return (
    <div className={styles.cards}>
      {data &&
        data.transactions &&
        data.transactions.map((transaction: Transaction) => {
          return (
            <div className={styles.card} key={transaction.id}>
              <Tooltip.Root>
                <Tooltip.Trigger
                  className={styles.button}
                  onClick={() => {
                    handleClick(transaction.id);
                  }}
                >
                  <Cross2Icon />
                </Tooltip.Trigger>
              </Tooltip.Root>
              <ul className={styles.ul}>
                <li>Descripcion: {transaction.description}</li>
                <li>Valor: {transaction.amount}</li>
                <li>Categoria: {transaction.category?.name}</li>
              </ul>
            </div>
          );
        })}
    </div>
  );
};
export default TransactionCards;
