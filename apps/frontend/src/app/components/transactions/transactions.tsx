import { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_TRANSACTION } from '../../services/transactions';
import { PlusIcon } from '@radix-ui/react-icons';
import * as Tooltip from '@radix-ui/react-tooltip';
import { Transaction } from '@creation-mono/shared/types';

import styles from './transactions.module.css';

import TransactionCards from '../transactionCards/transactionCards';
import TransactionModal from '../transactionModal/transactionModal';

type onSelect = {
  onSelect: (id: string) => void;
  transactionsData: (transactions: Transaction[]) => void;
};

const Transactions = ({ onSelect, transactionsData }: onSelect) => {
  const [open, onOpenChange] = useState(false);
  const openTransactionModal = () => {
    onOpenChange(true);
  };

  const [getTransaction] = useLazyQuery(GET_TRANSACTION, {
    onCompleted: (data) => {
      const { transactions } = data;
      setTransactions(transactions);
    },
    fetchPolicy: 'network-only',
  });

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    getTransaction();
    transactionsData(transactions);
  }, [transactions]);

  const organizedList = transactions.sort(
    (previous, current) =>
      new Date(current.date).valueOf() - new Date(previous.date).valueOf()
  );

  return (
    <div className={styles.transactions}>
      <div className={styles.header}>
        <span className={styles['transaction-title']}>Transacciones</span>

        <Tooltip.Root delayDuration={0}>
          <Tooltip.Trigger
            className={styles['add-btn']}
            onClick={openTransactionModal}
          >
            <PlusIcon />
          </Tooltip.Trigger>

          <Tooltip.Content
            className={styles.tooltip}
            side="right"
            sideOffset={10}
          >
            Agregar Transacción
          </Tooltip.Content>
        </Tooltip.Root>
      </div>
      <div className={styles.cards}>
        <TransactionCards
          onCardSelected={onSelect}
          transactions={organizedList}
        />
      </div>
      <TransactionModal
        openModal={open}
        setOpenModal={onOpenChange}
        transaction={{}}
      />
    </div>
  );
};

export default Transactions;
