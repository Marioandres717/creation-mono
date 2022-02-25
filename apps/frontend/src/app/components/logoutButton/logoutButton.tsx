import { useState } from 'react';

import styles from './logoutButton.module.css';

import * as Dialog from '@radix-ui/react-dialog';
import { GearIcon } from '@radix-ui/react-icons';
import { useLazyQuery } from '@apollo/client';
import { LOGOUT } from '../../services/login';

const LogoutButton = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const [logout] = useLazyQuery(LOGOUT, {
    onCompleted: () => {
      window.location.reload();
    },
    fetchPolicy: 'network-only',
  });

  const onHandleClick = () => {
    logout();
  };

  return (
    <Dialog.Root open={openDialog} onOpenChange={setOpenDialog}>
      <Dialog.Trigger className={styles.trigger}>
        <GearIcon className={styles.icon} />
        <span className={styles.title}>Cerrar Sesión</span>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content
          onInteractOutside={(e) => e.preventDefault()}
          className={styles.modal}
        >
          <Dialog.Description className={styles.description}>
            cerrar sesion?
          </Dialog.Description>
          <div>
            <Dialog.Close
              className={styles['confirm-button']}
              onClick={onHandleClick}
            >
              Aceptar
            </Dialog.Close>
            <Dialog.Close className={styles['cancel-button']}>
              Cancelar
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
export default LogoutButton;
