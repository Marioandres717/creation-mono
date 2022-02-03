import { useLazyQuery } from '@apollo/client';
import { Transaction, Category } from '@creation-mono/shared/types';
import { useEffect, useState } from 'react';
import { GET_TRANSACTION } from '../../services/transactions';
import {
  Pencil1Icon,
  QuestionMarkCircledIcon,
  ReaderIcon,
  RocketIcon,
} from '@radix-ui/react-icons';
import * as Tooltip from '@radix-ui/react-tooltip';
import styles from './transactionCards.module.css';
import clsx from 'clsx';
import TransactionModal from '../transactionModal/transactionModal';
import FormatAmount from '../formats/formatAmount';

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

  const [selected, setSelected] = useState<Transaction>({});

  const [active, setActive] = useState('');

  const [openModal, setOpenModal] = useState(false);

  const openFormModal = (transaction: Transaction) => {
    setOpenModal(true);
    setSelected(transaction);
  };

  useEffect(() => {
    getTransaction();
  }, []);

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
            <Pencil1Icon
              className={styles.button}
              onClick={() => {
                openFormModal(transaction);
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

              <FormatAmount
                className={styles.list_value}
                amount={transaction.amount}
              />

              <li className={styles.list_description}>
                {transaction.description}
              </li>
            </ul>
          </div>
        );
      })}
      <TransactionModal
        openModal={openModal}
        transaction={selected}
        setOpenModal={setOpenModal}
      />
    </div>
  );
};
export default TransactionCards;
