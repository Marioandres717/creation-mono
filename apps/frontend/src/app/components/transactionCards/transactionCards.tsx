import { Transaction, Category } from '@creation-mono/shared/types';
import { useEffect, useState } from 'react';

import {
  QuestionMarkCircledIcon,
  ReaderIcon,
  RocketIcon,
} from '@radix-ui/react-icons';
import * as Tooltip from '@radix-ui/react-tooltip';
import styles from './transactionCards.module.css';
import clsx from 'clsx';
import FormatAmount from '../formats/formatAmount';

type Nullable<T> = T | null;
type Props = {
  onCardSelected: (id: string) => void;
  transactions: Transaction[];
};

const TransactionCards = ({ onCardSelected, transactions }: Props) => {
  const initialId = transactions !== [] ? transactions[0]?.id : null;
  const [active, setActive] = useState(initialId);

  const [defaultCard, setDefaultCard] = useState(initialId);

  const onSelectedCard = (id: string) => {
    setDefaultCard(id);
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
    console.log(active);
    return clsx(styles['card'], {
      [styles['card_active']]: id === active,
    });
  };

  useEffect(() => {
    setActive(initialId);
  }, [initialId]);

  useEffect(() => {
    onCardSelected(defaultCard || initialId || '');
  }, [defaultCard, initialId]);

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
                className={
                  transaction.isExpense === 1
                    ? styles['amount-red']
                    : styles['amount-green']
                }
                amount={transaction.amount}
              />

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
