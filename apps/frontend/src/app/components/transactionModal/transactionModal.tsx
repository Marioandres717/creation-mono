import { useState, useEffect, FormEvent } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useMutation, useLazyQuery } from '@apollo/client';
import styles from './transactionModal.module.css';
import { Category, TransactionUpdateInput } from '@creation-mono/shared/types';
import { GET_CATEGORY } from '../../services/category';
import {
  EDIT_TRANSACTION,
  TRANSACTION,
  GET_TRANSACTION,
} from '../../services/transactions';

type Props = {
  transaction?: TransactionUpdateInput;
  openModal: boolean;
  setOpenModal: React.Dispatch<boolean>;
};

// const dropdownMenu = () => {
//   return (
//     <DropdownMenu.Root>
//       <DropdownMenu.Trigger>
//         <select />
//       </DropdownMenu.Trigger>
//       <DropdownMenu.Content>
//         <option>cash</option>
//       </DropdownMenu.Content>
//     </DropdownMenu.Root>
//   );
// };

const TransactionModal = ({
  transaction = {},
  openModal,
  setOpenModal,
}: Props) => {
  const isEdit = JSON.stringify(transaction) !== '{}';

  const [selectedTransaction, setSelectedTransaction] = useState(transaction);

  const mutation = isEdit ? EDIT_TRANSACTION : TRANSACTION;

  const [addMutation] = useMutation(mutation, {
    refetchQueries: [GET_TRANSACTION, 'getTransaction'],
  });

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

  const expense = (value: boolean) => {
    if (value === true) {
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
              <fieldset className={styles.fieldset}>
                <label htmlFor="amount_value" className={styles['form-labels']}>
                  Valor
                </label>
                <input
                  className={styles['form-input']}
                  id="amount"
                  type="number"
                  value={selectedTransaction.amount || ''}
                  onChange={(e) => {
                    updateform(e.target.value, 'amount');
                  }}
                />
              </fieldset>
              <fieldset className={styles.fieldset}>
                <label htmlFor="categories" className={styles['form-labels']}>
                  Categoría
                </label>
                <select
                  className={styles['select-input']}
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
              <fieldset className={styles.fieldset}>
                {/* <DropdownMenu.Root>
                  <DropdownMenu.Label className={styles['form-labels']}>
                    Tipo:
                  </DropdownMenu.Label>
                  <DropdownMenu.Trigger>
                    <select />
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content>
                    <DropdownMenu.Item>
                      <option>cash</option>
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root> */}
                <label htmlFor="type" className={styles['form-labels']}>
                  Tipo:
                </label>
                <select
                  value={selectedTransaction.type || ''}
                  className={styles['select-input']}
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
                <label htmlFor="isExpense" className={styles['form-labels']}>
                  Es un gasto?
                </label>
                <input
                  type="checkbox"
                  checked={selectedTransaction.isExpense ? true : false}
                  className={styles.checkbox}
                  onChange={(e) => {
                    updateform(expense(e.target.checked), 'isExpense');
                  }}
                />
              </fieldset>
              <fieldset className={styles.fieldset}>
                <label htmlFor="description" className={styles['form-labels']}>
                  Descripción
                </label>
                <textarea
                  className={styles['form-input']}
                  id="description"
                  value={selectedTransaction.description || ''}
                  onChange={(e) => {
                    updateform(e.target.value, 'description');
                  }}
                />
              </fieldset>
              <fieldset>
                <Dialog.Close className={styles['cancel-button']}>
                  Cancelar
                </Dialog.Close>
                <input
                  className={styles['submit-button']}
                  type="submit"
                  value="Aceptar"
                />
              </fieldset>
            </form>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default TransactionModal;
