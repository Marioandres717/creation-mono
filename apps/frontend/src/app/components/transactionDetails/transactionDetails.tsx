import { useState, ReactNode, FC, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tooltip from '@radix-ui/react-tooltip';
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';
import { useLazyQuery, useMutation } from '@apollo/client';
import { Category, Transaction } from '@creation-mono/shared/types';
import {
  GET_TRANSACTION,
  DELETE_TRANSACTION,
} from '../../services/transactions';
import styles from './transactionDetails.module.css';
import FormatDate from '../formats/formatDate';
import FormatAmount from '../formats/formatAmount';
import TransactionModal from '../transactionModal/transactionModal';
type Props = {
  children: ReactNode;
};
type ModalType = {
  categories: Category[];
  id: string;
};

const DeleteTransactionModal: FC<Props> = ({ children, ...props }) => {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className={styles.overlay} />
      <Dialog.Content
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        {...props}
      >
        <div className={styles.modal}>{children}</div>
      </Dialog.Content>
    </Dialog.Portal>
  );
};

const TransactionDetails = ({ id, categories }: ModalType) => {
  const [transaction, setTransactionsDetails] = useState<Transaction>({});
  const [getTransaction] = useLazyQuery(GET_TRANSACTION, {
    onCompleted: (data) => {
      const { transactions } = data;
      setTransactionsDetails(transactions[0]);
    },
    fetchPolicy: 'network-only',
  });

  const [openModal, setOpenModal] = useState(false);
  const handleClick = () => {
    setOpenModal(!openModal);
  };

  const [open, setOpen] = useState(false);
  const onClick = (transaction: Transaction) => {
    setOpen(true);
    setTransactionsDetails(transaction);
  };

  const [deleteTransaction] = useMutation(DELETE_TRANSACTION, {
    refetchQueries: [GET_TRANSACTION, 'getTransaction'],
  });

  const onDeleteClick = (id: string) => {
    deleteTransaction({
      variables: {
        id: id,
      },
    });
  };

  let transactionTemplate;

  if (transaction?.id) {
    transactionTemplate = (
      <div className={styles['transaction-container']}>
        <div className={styles.section}>
          <div className={styles.elements}>
            <span className={styles['category-name']}>
              {transaction.category?.name}
            </span>
            <FormatDate date={transaction.date} className={styles.date} />
          </div>
          <div className={styles.elements}>
            <FormatAmount
              amount={transaction.amount}
              className={
                transaction.isExpense === 1
                  ? styles['amount-red']
                  : styles['amount-green']
              }
            />
            <span className={styles['description-type']}>
              {transaction.type}
            </span>
          </div>
          <div className={styles.elements}>
            <span className={styles['description-type']}>
              {transaction.description}
            </span>

            <div>
              <Tooltip.Root>
                <Tooltip.Trigger
                  className={styles['delete-btn']}
                  onClick={() => {
                    onClick(transaction);
                  }}
                >
                  <Pencil1Icon color="var(--white-300)" />
                </Tooltip.Trigger>
                <Tooltip.Content
                  className={styles.tooltip}
                  side="left"
                  sideOffset={10}
                >
                  Editar Transacción
                </Tooltip.Content>
              </Tooltip.Root>
              <Dialog.Root open={openModal} onOpenChange={setOpenModal}>
                <Tooltip.Root>
                  <Tooltip.Trigger
                    className={styles['delete-btn']}
                    onClick={handleClick}
                  >
                    <TrashIcon color="red" />
                  </Tooltip.Trigger>
                  <Tooltip.Content
                    className={styles.tooltip}
                    side="left"
                    sideOffset={10}
                  >
                    Eliminar Transacción
                  </Tooltip.Content>
                </Tooltip.Root>

                <DeleteTransactionModal>
                  <div className={styles['modal-content']}>
                    <span className={styles['modal-text']}>
                      Quieres eliminar la transacción?
                    </span>
                    <fieldset>
                      <Dialog.Close
                        className={styles['button-yes']}
                        onClick={() => onDeleteClick(transaction.id || '')}
                      >
                        Eliminar
                      </Dialog.Close>
                      <Dialog.Close className={styles['button-no']}>
                        Cancelar
                      </Dialog.Close>
                    </fieldset>
                  </div>
                </DeleteTransactionModal>
              </Dialog.Root>
            </div>
          </div>
        </div>
        <TransactionModal
          transaction={transaction}
          openModal={open}
          setOpenModal={setOpen}
          categories={categories}
        />
      </div>
    );
  }

  useEffect(() => {
    if (id) {
      getTransaction({ variables: { id } });
    }
  }, [id]);

  return (
    <div className={styles.transaction_details}>{transactionTemplate}</div>
  );
};
export default TransactionDetails;
