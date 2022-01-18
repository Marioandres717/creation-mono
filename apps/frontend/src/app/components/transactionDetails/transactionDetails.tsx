import { useLazyQuery } from '@apollo/client';
import { Transaction } from '@creation-mono/shared/types';
import { useEffect } from 'react';
import { PULLTRANSACTION } from '../../services/transactions';

type Nullable<T> = T | null;

const TransactionDetails = ({ id }: any) => {
  const [getTransaction, { data }] = useLazyQuery(PULLTRANSACTION);

  useEffect(() => {
    getTransaction({
      variables: {
        id: id,
      },
    });
  }, [id]);

  return (
    <div>
      {data?.transactions.map((transaction: Transaction) => {
        return (
          <div key={transaction.id}>
            <ul>
              <li>$ {transaction.amount}</li>
              <li>{transaction.description}</li>
              <li>{transaction.type}</li>
              <li>{transaction.date}</li>
              <li>{transaction.category?.name}</li>
            </ul>
          </div>
        );
      })}
    </div>
  );
};
export default TransactionDetails;
