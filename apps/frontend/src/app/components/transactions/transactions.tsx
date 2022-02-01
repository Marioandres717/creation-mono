import { useState, FC, ReactNode, FormEvent, useEffect } from 'react';
import { PlusIcon } from '@radix-ui/react-icons';
import * as Tooltip from '@radix-ui/react-tooltip';
import * as Dialog from '@radix-ui/react-dialog';
import { useMutation, useLazyQuery } from '@apollo/client';
import styles from './transactions.module.css';
import { Category } from '@creation-mono/shared/types';
import { GET_CATEGORY } from '../../services/category';
import { TRANSACTION } from '../../services/transactions';
import TransactionCards from '../transactionCards/transactionCards';

type Nullable<T> = T | null;
type Props = {
  children: ReactNode;
};
type onSelect = {
  onSelect: (id: string) => void;
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
  const [getCategory] = useLazyQuery(GET_CATEGORY, {
    onCompleted: (data) => {
      const { categories } = data;
      setCategory(categories);
    },
  });
  const [category, setCategory] = useState<Category[]>([]);
  const [open, onOpenChange] = useState(false);
  const openTransactionModal = () => {
    onOpenChange(true);
  };
  const [form, setForm] = useState({
    description: '',
    amount: '',
    categoryId: '',
    type: '',
    isExpense: 0,
  });
  const [newTransaction] = useMutation(TRANSACTION);
  const updateform = (
    value: string | number | Nullable<string> | undefined,
    type: string
  ) => {
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
        isExpense: form.isExpense,
      },
    });
    setTimeout(() => {
      onOpenChange(false);
    }, 1000);
  };

  const expense = (value: string) => {
    if (value === 'Si') {
      return 1;
    } else {
      return 0;
    }
  };

  let selectCategory;
  if (category) {
    selectCategory = (
      <select
        className={styles.select_input}
        id="categories-list"
        onChange={(e) => {
          updateform(
            category
              .filter((category) => e.target.value === category.name)
              .map((getId) => getId.id)
              .pop(),
            'categoryId'
          );
        }}
      >
        <option></option>
        {category.map((category) => {
          return <option key={category.id}>{category.name}</option>;
        })}
      </select>
    );
  }
  useEffect(() => {
    getCategory();
  }, [getCategory]);

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
        <TransactionCards onCardSelected={onSelect} />
      </div>
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
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
              {selectCategory}
            </fieldset>
            <fieldset>
              <label htmlFor="type">tipo:</label>
              <select
                className={styles.select_input}
                onChange={(e) => {
                  updateform(e.target.value, 'type');
                }}
              >
                <option></option>
                <option>cash</option>
                <option>cheque</option>
                <option>pending</option>
              </select>
            </fieldset>

            <fieldset>
              <label htmlFor="isExpense">Es un gasto?:</label>
              <select
                className={styles.select_input}
                onChange={(e) => {
                  updateform(expense(e.target.value), 'isExpense');
                }}
              >
                <option></option>
                <option>Si</option>
                <option>No</option>
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
