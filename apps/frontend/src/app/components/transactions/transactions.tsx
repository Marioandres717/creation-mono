import { useState } from 'react';
import { PlusIcon } from '@radix-ui/react-icons';
import * as Tooltip from '@radix-ui/react-tooltip';

import styles from './transactions.module.css';

import TransactionCards from '../transactionCards/transactionCards';
import TransactionModal from '../transactionModal/transactionModal';

type onSelect = {
  onSelect: (id: string) => void;
};

const Transactions = ({ onSelect }: onSelect) => {
  const [open, onOpenChange] = useState(false);
  const openTransactionModal = () => {
    onOpenChange(true);
  };

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
      <TransactionModal
        openModal={open}
        setOpenModal={onOpenChange}
        transaction={{}}
      />
    </div>
  );
};

export default Transactions;
