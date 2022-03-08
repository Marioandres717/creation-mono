import { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_TRANSACTION } from '../../services/transactions';
import { GET_CATEGORY } from '../../services/category';
import { PlusIcon } from '@radix-ui/react-icons';
import * as Tooltip from '@radix-ui/react-tooltip';
import { Transaction, Category } from '@creation-mono/shared/types';

import styles from './transactions.module.css';

import TransactionCards from '../transactionCards/transactionCards';
import TransactionModal from '../transactionModal/transactionModal';

type Props = {
  onSelect: (id: string) => void;
  transactionsData: (transactions: Transaction[]) => void;
  categoriesData: (categories: Category[]) => void;
};

const Transactions = ({
  onSelect,
  transactionsData,
  categoriesData,
}: Props) => {
  const [open, onOpenChange] = useState(false);
  const openTransactionModal = () => {
    onOpenChange(true);
  };
  const [getCategory] = useLazyQuery(GET_CATEGORY, {
    onCompleted: (data) => {
      const { categories } = data;
      setCategories(categories || []);
    },
    fetchPolicy: 'network-only',
  });
  const [categories, setCategories] = useState<Category[]>([]);

  const [getTransaction] = useLazyQuery(GET_TRANSACTION, {
    onCompleted: (data) => {
      const { transactions } = data;
      setTransactions(transactions || []);
    },
    fetchPolicy: 'network-only',
  });

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    getCategory();
    getTransaction();
    transactionsData(transactions);
    categoriesData(categories);
  }, [transactions, categories]);

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
        categories={categories}
        openModal={open}
        setOpenModal={onOpenChange}
        transaction={{}}
      />
    </div>
  );
};

export default Transactions;
