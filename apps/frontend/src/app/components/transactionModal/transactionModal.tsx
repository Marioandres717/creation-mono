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
import { ChevronDownIcon, DotFilledIcon } from '@radix-ui/react-icons';

type Props = {
  transaction?: TransactionUpdateInput;
  openModal: boolean;
  setOpenModal: React.Dispatch<boolean>;
};

const TransactionModal = ({
  transaction = {},
  openModal,
  setOpenModal,
}: Props) => {
  const isEdit = JSON.stringify(transaction) !== '{}';

  const [selectedCategory, setSelectedCategory] = useState('');

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
        categoryId: selectedCategory,
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
      setCategories(categories);
    },
    fetchPolicy: 'network-only',
  });
  const [categories, setCategories] = useState<Category[]>([]);

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
  const categoryList = categories.map((category) => {
    return (
      <DropdownMenu.RadioItem
        value={category.id || ''}
        className={styles['category-item']}
      >
        <DropdownMenu.ItemIndicator className={styles['category-icon']}>
          <DotFilledIcon />
        </DropdownMenu.ItemIndicator>
        {category.name}
      </DropdownMenu.RadioItem>
    );
  });
  const triggerLabel = categories
    .filter((category) => selectedCategory === category.id)
    .map((getName) => getName.name)
    .pop();

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

              <fieldset className={styles.section}>
                <div className={styles.fieldset}>
                  <DropdownMenu.Root>
                    <DropdownMenu.Label className={styles['form-labels']}>
                      Categorias
                    </DropdownMenu.Label>
                    <DropdownMenu.Trigger className={styles['select-input']}>
                      <span className={styles['select-title']}>
                        {triggerLabel ? triggerLabel : ''}
                      </span>
                      <ChevronDownIcon className={styles['select-icon']} />
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content align="start">
                      <DropdownMenu.RadioGroup
                        value={selectedCategory}
                        onValueChange={setSelectedCategory}
                        className={styles['categories-container']}
                      >
                        {categoryList}
                      </DropdownMenu.RadioGroup>
                    </DropdownMenu.Content>
                  </DropdownMenu.Root>
                </div>
                <div className={styles['checkbox-container']}>
                  <label htmlFor="isExpense" className={styles['form-labels']}>
                    gasto?
                  </label>
                  <input
                    type="checkbox"
                    checked={selectedTransaction.isExpense ? true : false}
                    className={styles.checkbox}
                    onChange={(e) => {
                      updateform(expense(e.target.checked), 'isExpense');
                    }}
                  />
                </div>
              </fieldset>

              <fieldset className={styles.fieldset}>
                <label htmlFor="description" className={styles['form-labels']}>
                  Descripción
                </label>
                <textarea
                  maxLength={108}
                  rows={4}
                  className={styles['text-area']}
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
