import { useState, FC, ReactNode, FormEvent } from 'react';
import { PlusIcon } from '@radix-ui/react-icons';
import * as Tooltip from '@radix-ui/react-tooltip';
import * as Dialog from '@radix-ui/react-dialog';

import styles from './transactions.module.css';

type Props = {
  children: ReactNode;
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

const Transactions = () => {
  const [open, onOpenChange] = useState(false);
  const openTransactionModal = () => {
    onOpenChange(true);
  };

  const addTransaction = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTimeout(() => {
      onOpenChange(false);
    }, 3000);
  };

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
              <label htmlFor="amount_type">Tipo</label>
              <input id="amount_type" type="text" />
            </fieldset>
            <fieldset>
              <label htmlFor="amount_value">Valor</label>
              <input id="amount_value" type="number" />
            </fieldset>
            <input type="submit" value="Crear" />
          </form>
        </TransactionModal>
      </Dialog.Root>
    </div>
  );
};

export default Transactions;
