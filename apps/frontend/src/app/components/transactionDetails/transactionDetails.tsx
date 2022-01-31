import { useState, ReactNode, FC } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tooltip from '@radix-ui/react-tooltip';
import { useLazyQuery, useMutation } from '@apollo/client';
import { Transaction } from '@creation-mono/shared/types';
import { useEffect } from 'react';
import { GET_TRANSACTION } from '../../services/transactions';
import styles from './transactionDetails.module.css';
import { TrashIcon } from '@radix-ui/react-icons';
import { DELETE_TRANSACTION } from '../../services/transactions';
type Nullable<T> = T | null;
type Props = {
  children: ReactNode;
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

const TransactionDetails = ({ id }: Transaction) => {
  const [transaction, setTransactionsDetails] = useState<Transaction>();
  const [getTransaction] = useLazyQuery(GET_TRANSACTION, {
    onCompleted: (data) => {
      const { transactions } = data;
      setTransactionsDetails(transactions[0]);
    },
  });

  const [openModal, setOpenModal] = useState(false);
  const handleClick = () => {
    setOpenModal(!openModal);
  };
  const [deleteTransaction] = useMutation(DELETE_TRANSACTION, {
    onCompleted: (data) => {
      const { transactionDelete } = data;
      setOnDelete(transactionDelete);
    },
  });
  const [onDelete, setOnDelete] = useState<Transaction[]>([]);

  const onDeleteClick = (id: Nullable<string> | undefined) => {
    deleteTransaction({
      variables: {
        id: id,
      },
    });
  };

  let transactionTemplate;
  if (transaction?.id) {
    transactionTemplate = (
      <div className={styles.transaction_details}>
        <ul className={styles.list_container} key={transaction.id}>
          <li className={styles.list}>
            <span className={styles.title}>Descripción</span>
            <span className={styles.subtitle}>{transaction.description}</span>
          </li>
          <li className={styles.list}>
            <span className={styles.title}>Valor</span>
            <span className={styles.subtitle}>$ {transaction.amount}</span>
          </li>
          <li className={styles.list}>
            <span className={styles.title}>Fecha y Hora</span>
            <span className={styles.subtitle}>
              {transaction.date.slice(0, 10)}
            </span>
            <span className={styles.subtitle}>
              {transaction.date.slice(11, 19)}
            </span>
          </li>
          <li className={styles.list}>
            <span className={styles.title}>Tipo</span>
            <span className={styles.subtitle}>{transaction.type}</span>
          </li>
          <li className={styles.list_r}>
            <span className={styles.title}>Categoría</span>
            <span className={styles.subtitle}>
              {transaction.category?.name}
            </span>
          </li>
          <li>
            <Dialog.Root open={openModal} onOpenChange={setOpenModal}>
              <Tooltip.Root>
                <Tooltip.Trigger
                  className={styles['delete-btn']}
                  onClick={handleClick}
                >
                  <TrashIcon />
                </Tooltip.Trigger>
                <Tooltip.Content
                  className={styles.tooltip}
                  side="left"
                  sideOffset={10}
                >
                  Eliminar Transaccion
                </Tooltip.Content>
              </Tooltip.Root>
              <DeleteTransactionModal>
                <form action="">
                  <span>Quieres eliminar la transaccion?</span>
                  <button onClick={() => onDeleteClick(transaction.id)}>
                    yes
                  </button>
                  <button>no</button>
                </form>
              </DeleteTransactionModal>
            </Dialog.Root>
          </li>
        </ul>
      </div>
    );
  }

  useEffect(() => {
    if (id) {
      getTransaction({ variables: { id } });
    }
  }, [id, getTransaction, onDelete]);

  return (
    <div className={styles.transaction_details}>{transactionTemplate}</div>
  );
};
export default TransactionDetails;
