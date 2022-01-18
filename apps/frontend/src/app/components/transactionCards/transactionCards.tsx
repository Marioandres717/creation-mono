import { useLazyQuery, useMutation } from '@apollo/client';
import { Transaction } from '@creation-mono/shared/types';
import { useEffect } from 'react';
import { GETTRANSACTION, DELETETRANSACTION } from '../../services/transactions';
import {
  Cross2Icon,
  DrawingPinFilledIcon,
  ExitIcon,
  QuestionMarkCircledIcon,
  ReaderIcon,
  RocketIcon,
} from '@radix-ui/react-icons';
import * as Tooltip from '@radix-ui/react-tooltip';
import styles from './transactionCards.module.css';

type Nullable<T> = T | null;
type Props = {
  onSelected: (id: string | null) => void;
};

const TransactionCards = ({ onSelected }: Props) => {
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

  const onSelectedCard = (id: any) => {
    onSelected(id);
  };

  const selectedIcon = (category: Nullable<string> | undefined) => {
    if (category === 'Servicios publicos') {
      return <ReaderIcon />;
    } else if (category === 'ocio') {
      return <RocketIcon />;
    } else if (category === 'pagos') {
      return <ExitIcon />;
    } else if (category === 'salud') {
      return <DrawingPinFilledIcon />;
    } else {
      return <QuestionMarkCircledIcon />;
    }
  };

  return (
    <div className={styles.cards}>
      {data?.transactions.map((transaction: Transaction) => {
        return (
          <div className={styles.card} key={transaction.id}>
            <Cross2Icon
              className={styles.button}
              onClick={() => {
                handleClick(transaction.id);
              }}
            />

            <ul
              className={styles.ul}
              onClick={() => {
                onSelectedCard(transaction.id);
              }}
            >
              <Tooltip.Root delayDuration={0}>
                <Tooltip.Trigger className={styles.icon}>
                  {selectedIcon(transaction.category?.name)}
                </Tooltip.Trigger>
                <Tooltip.Content
                  side="right"
                  className={styles.tooltip}
                  sideOffset={20}
                >
                  {transaction.category?.name}
                </Tooltip.Content>
              </Tooltip.Root>

              <li className={styles.list_value}>$ {transaction.amount}</li>
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
