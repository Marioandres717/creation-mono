import { useState, useEffect, FormEvent } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { useMutation, useLazyQuery } from '@apollo/client';
import styles from './transactionModal.module.css';
import { Category, TransactionUpdateInput } from '@creation-mono/shared/types';
import { GET_CATEGORY } from '../../services/category';
import { EDIT_TRANSACTION, TRANSACTION } from '../../services/transactions';

type Props = {
  transaction?: TransactionUpdateInput;
  openModal: boolean;
  setOpenModal: React.Dispatch<boolean>;
};
type Nullable<T> = T | null;

const TransactionModal = ({
  transaction = {},
  openModal,
  setOpenModal,
}: Props) => {
  const isEdit = JSON.stringify(transaction) !== '{}';

  const [selectedTransaction, setSelectedTransaction] = useState(transaction);

  const mutation = isEdit ? EDIT_TRANSACTION : TRANSACTION;

  const [addMutation] = useMutation(mutation);

  const addTransaction = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addMutation({
      variables: {
        id: selectedTransaction.id,
        description: selectedTransaction.description,
        amount: selectedTransaction.amount,
        date: new Date().toISOString(),
        categoryId: selectedTransaction.categoryId,
        type: selectedTransaction.type,
        isExpense: selectedTransaction.isExpense,
      },
    });
    setTimeout(() => {
      setOpenModal(false);
    }, 1000);
  };

  const [getCategory] = useLazyQuery(GET_CATEGORY, {
    onCompleted: (data) => {
      const { categories } = data;
      setCategory(categories);
    },
    fetchPolicy: 'network-only',
  });
  const [category, setCategory] = useState<Category[]>([]);

  const updateform = (value: string | number, type: string) => {
    setSelectedTransaction({ ...selectedTransaction, ...{ [type]: value } });
  };

  const expense = (value: string) => {
    if (value === 'Si') {
      return 1;
    } else {
      return 0;
    }
  };

  useEffect(() => {
    setSelectedTransaction(transaction);
  }, [transaction]);

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <Dialog.Root open={openModal} onOpenChange={setOpenModal}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <div className={styles.modal}>
            <form className={styles.form} onSubmit={addTransaction}>
              <fieldset>
                <label htmlFor="description">descripción:</label>
                <input
                  id="description"
                  type="text"
                  value={selectedTransaction.description || ''}
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
                  value={selectedTransaction.amount || ''}
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
                      category
                        .filter((category) => e.target.value === category.name)
                        .map((getId) => getId.id)
                        .pop() || '',
                      'categoryId'
                    );
                  }}
                >
                  {category.map((category) => {
                    return <option key={category.id}>{category.name}</option>;
                  })}
                </select>
              </fieldset>
              <fieldset>
                <label htmlFor="type">tipo:</label>
                <select
                  value={selectedTransaction.type || ''}
                  className={styles.select_input}
                  onChange={(e) => {
                    updateform(e.target.value, 'type');
                  }}
                >
                  <option disabled></option>
                  <option>cash</option>
                  <option>cheque</option>
                  <option>pending</option>
                </select>
              </fieldset>

              <fieldset>
                <label htmlFor="isExpense">Es un gasto?:</label>
                <select
                  value={selectedTransaction.isExpense === 1 ? 'Si' : 'No'}
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
              <fieldset>
                <input
                  className={styles.form_button}
                  type="submit"
                  value="Listo"
                />
                <Dialog.Close className={styles.form_button}>
                  Cancelar
                </Dialog.Close>
              </fieldset>
            </form>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default TransactionModal;
