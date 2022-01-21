import { useState, FC, ReactNode, FormEvent, useEffect } from 'react';
import { PlusIcon } from '@radix-ui/react-icons';
import * as Tooltip from '@radix-ui/react-tooltip';
import * as Dialog from '@radix-ui/react-dialog';
import { useMutation, useLazyQuery } from '@apollo/client';
import styles from './transactions.module.css';
import { Category } from '@creation-mono/shared/types';
import { GETCATEGORY } from '../../services/category';
import { TRANSACTION } from '../../services/transactions';
import TransactionCards from '../transactionCards/transactionCards';

type Props = {
  children: ReactNode;
};
type onSelect = {
  onSelect: (id: string | null) => void;
};

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

const Transactions = ({ onSelect }: onSelect) => {
  const [getCategory, { data }] = useLazyQuery(GETCATEGORY);
  const [open, onOpenChange] = useState(false);
  const openTransactionModal = () => {
    onOpenChange(true);
  };
  const [form, setForm] = useState({
    description: '',
    amount: '',
    categoryId: '',
    type: '',
  });
  const [newTransaction] = useMutation(TRANSACTION, {
    onCompleted: () => {
      window.location.reload();
    },
  });

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
        categoryId: form.categoryId,
        type: form.type,
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
        <div className={styles.cards}>
          <TransactionCards
            onSelected={(id) => {
              onSelect(id);
            }}
          />
        </div>

        <TransactionModal>
          <form className={styles.form} onSubmit={addTransaction}>
            <fieldset>
              <label htmlFor="description">descripción:</label>
              <input
                id="description"
                type="text"
                onChange={(e) => {
                  updateform(e.target.value, 'description');
                }}
              />
            </fieldset>
            <fieldset>
              <label htmlFor="amount_value">Valor:</label>
              <input
                id="amount"
                type="number"
                onChange={(e) => {
                  updateform(e.target.value, 'amount');
                }}
              />
            </fieldset>
            <fieldset>
              <label htmlFor="categories">categoría:</label>
              <select
                className={styles.select_input}
                id="categories-list"
                onChange={(e) => {
                  updateform(
                    data.categories
                      .filter(
                        (category: Category) => e.target.value === category.name
                      )
                      .map((getId: Category) => getId.id)
                      .pop(),
                    'categoryId'
                  );
                }}
              >
                {data?.categories.map((category: Category) => {
                  return <option key={category.id}>{category.name}</option>;
                })}
              </select>
            </fieldset>
            <fieldset>
              <label htmlFor="type">tipo:</label>
              <select
                className={styles.select_input}
                onChange={(e) => {
                  updateform(e.target.value, 'type');
                }}
              >
                <option>cash</option>
                <option>cheque</option>
                <option>pending</option>
              </select>
            </fieldset>
            <input className={styles.form_button} type="submit" value="Crear" />
          </form>
        </TransactionModal>
      </Dialog.Root>
    </div>
  );
};

export default Transactions;
