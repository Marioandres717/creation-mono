import { useState, FC, ReactNode, FormEvent, useEffect } from 'react';
import { PlusIcon } from '@radix-ui/react-icons';
import * as Tooltip from '@radix-ui/react-tooltip';
import * as Dialog from '@radix-ui/react-dialog';
import { gql, useMutation, useLazyQuery } from '@apollo/client';
import styles from './transactions.module.css';
import { Category } from '@creation-mono/shared/types';
import { GETCATEGORY } from '../../services/category';

type Props = {
  children: ReactNode;
};
const TRANSACTION = gql`
  mutation transaction(
    $description: String
    $amount: Decimal!
    $date: DateTime
  ) {
    insertTransaction(
      transaction: {
        description: $description
        amount: $amount
        isExpense: 1
        type: cash
        categoryId: "e98d4b08-0375-48c7-a508-c6eaf957a78f"
        date: $date
      }
    ) {
      id
      description
      date
      amount
      isExpense
    }
  }
`;
const TransactionModal: FC<Props> = ({ children, ...props }) => {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className={styles.overlay} />
      <Dialog.Content
        onInteractOutside={(e) => {
          /**
           * Prevents the modal from close
           * when overlay is clicked
           */
          e.preventDefault();
        }}
        {...props}
      >
        <div className={styles.modal}>{children}</div>
      </Dialog.Content>
    </Dialog.Portal>
  );
};

const Transactions = () => {
  const [getCategory, { data }] = useLazyQuery(GETCATEGORY);
  const [open, onOpenChange] = useState(false);
  const openTransactionModal = () => {
    onOpenChange(true);
  };
  const [form, setForm] = useState({ description: '', amount: '' });
  const [newTransaction] = useMutation(TRANSACTION);

  const updateform = (value: string, type: string) => {
    setForm({ ...form, ...{ [type]: value } });
  };

  const addTransaction = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    newTransaction({
      variables: {
        description: form.description,
        amount: form.amount,
        date: new Date().toISOString(),
      },
    });
    setTimeout(() => {
      onOpenChange(false);
    }, 3000);
  };
  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className={styles.transactions}>
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
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
        <TransactionModal>
          <form onSubmit={addTransaction}>
            <fieldset>
              <label htmlFor="description">Tipo</label>
              <input
                id="description"
                type="text"
                onChange={(e) => {
                  updateform(e.target.value, 'description');
                }}
              />
            </fieldset>
            <fieldset>
              <label htmlFor="amount_value">Valor</label>
              <input
                id="amount"
                type="number"
                onChange={(e) => {
                  updateform(e.target.value, 'amount');
                }}
              />
            </fieldset>
            <fieldset>
              <label htmlFor="categories">Categoria</label>
              <input list="categories-list" />
              <datalist id="categories-list">
                {data &&
                  data.categories &&
                  data.categories.map((category: Category) => {
                    return <option key={category.id}>{category.name}</option>;
                  })}
              </datalist>
            </fieldset>
            <input type="submit" value="Crear" />
          </form>
        </TransactionModal>
      </Dialog.Root>
    </div>
  );
};

export default Transactions;
