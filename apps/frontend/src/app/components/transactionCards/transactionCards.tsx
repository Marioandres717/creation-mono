import { useLazyQuery, useMutation } from '@apollo/client';
import { Transaction, Category } from '@creation-mono/shared/types';
import { useEffect, useState } from 'react';
import {
  GET_TRANSACTION,
  DELETE_TRANSACTION,
} from '../../services/transactions';
import {
  Cross2Icon,
  QuestionMarkCircledIcon,
  ReaderIcon,
  RocketIcon,
} from '@radix-ui/react-icons';
import * as Tooltip from '@radix-ui/react-tooltip';
import styles from './transactionCards.module.css';
import clsx from 'clsx';

type Nullable<T> = T | null;
type Props = {
  onCardSelected: (id: string) => void;
};

const TransactionCards = ({ onCardSelected }: Props) => {
  const [getTransaction] = useLazyQuery(GET_TRANSACTION, {
    onCompleted: (data) => {
      const { transactions } = data;
      setTransactions(transactions);
    },
    fetchPolicy: 'network-only',
  });
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [deleteTransaction] = useMutation(DELETE_TRANSACTION, {
    onCompleted: (data) => {
      const { transactionDelete } = data;
      setOnDelete(transactionDelete);
    },
  });
  const [onDelete, setOnDelete] = useState<Transaction[]>([]);
  const [active, setActive] = useState('');

  const handleClick = (id: Nullable<string> | undefined) => {
    deleteTransaction({
      variables: {
        id: id,
      },
    });
  };

  useEffect(() => {
    getTransaction();
    // setTransactions(transactions);
    setOnDelete(onDelete);
  }, [getTransaction, onDelete]);

  const onSelectedCard = (id: string) => {
    onCardSelected(id);
    setActive(id);
  };

  const selectIcon = (category: Nullable<Category> | undefined) => {
    const name = category?.name || '';
    let icon;
    switch (name) {
      case 'Servicios Publicos':
        icon = <ReaderIcon />;
        break;
      case 'Ocio':
        icon = <RocketIcon />;
        break;
      default:
        icon = <QuestionMarkCircledIcon />;
    }
    return icon;
  };

  const getCardClasses = (id: string) => {
    return clsx(styles['card'], {
      [styles['card_active']]: id === active,
    });
  };
  const formatNumber = (number: number) => {
    const formated = new Intl.NumberFormat('en-US').format(number);
    return formated;
  };
  return (
    <div className={styles.cards}>
      {transactions.map((transaction) => {
        return (
          <div
            className={getCardClasses(transaction.id || '')}
            key={transaction.id}
            onClick={() => {
              const idSelected = transaction.id || '';
              onSelectedCard(idSelected);
            }}
          >
            <Cross2Icon
              className={styles.button}
              onClick={() => {
                handleClick(transaction.id);
              }}
            />

            <ul className={styles.list_container}>
              <Tooltip.Root delayDuration={0}>
                <Tooltip.Trigger className={styles.icon}>
                  {selectIcon(transaction.category)}
                </Tooltip.Trigger>
                <Tooltip.Content
                  side="right"
                  className={styles.tooltip}
                  sideOffset={20}
                >
                  {transaction.category?.name}
                </Tooltip.Content>
              </Tooltip.Root>

              <li className={styles.list_value}>
                $ {formatNumber(transaction.amount)}
              </li>
              <li className={styles.list_description}>
                {transaction.description}
              </li>
            </ul>
          </div>
        );
      })}
    </div>
  );
};
export default TransactionCards;
