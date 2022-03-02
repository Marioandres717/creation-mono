import { useState, FormEvent, FC, ReactNode } from 'react';
import { useMutation } from '@apollo/client';
import { INSERT_CATEGORY } from '../../services/category';
import * as Tooltip from '@radix-ui/react-tooltip';
import * as Dialog from '@radix-ui/react-dialog';
import { PlusIcon } from '@radix-ui/react-icons';
import styles from './createCategory.module.css';
import CategoryCards from '../categoryCards/categoryCards';

type Props = {
  children: ReactNode;
};
type onSelected = { onSelected: (id: string) => void };

const CategoriesModal: FC<Props> = ({ children, ...props }) => {
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

const CreateCategory = ({ onSelected }: onSelected) => {
  const [input, setInput] = useState({ name: '' });
  const [category] = useMutation(INSERT_CATEGORY, {
    onCompleted: () => {
      window.location.reload();
    },
  });
  const [open, setOpen] = useState(false);
  const openCategoriesModal = () => {
    setOpen(true);
  };

  const updateForm = (value: string, type: string) => {
    setInput({ ...input, ...{ [type]: value } });
  };
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    category({
      variables: input,
    });
  };
  return (
    <div className={styles.categories}>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <div className={styles.header}>
          <span className={styles['category-title']}>Categorías</span>

          <Tooltip.Root delayDuration={0}>
            <Tooltip.Trigger
              className={styles['add-btn']}
              onClick={openCategoriesModal}
            >
              <PlusIcon />
            </Tooltip.Trigger>

            <Tooltip.Content
              className={styles.tooltip}
              side="right"
              sideOffset={10}
            >
              Agregar Categorías
            </Tooltip.Content>
          </Tooltip.Root>
        </div>
        <div>
          <CategoryCards onSelected={(id) => onSelected(id)} />
        </div>
        <CategoriesModal>
          <form onSubmit={onSubmit}>
            <fieldset className={styles.form}>
              <label className={styles['form-elements']} htmlFor="name">
                Nombre de la Categoría:
              </label>
              <input
                className={styles['form-elements']}
                type="text"
                id="name"
                onChange={(e) => {
                  updateForm(e.target.value, 'name');
                }}
              />
              <input
                className={styles['form-elements']}
                type="submit"
                value="Crear Categoría"
              />
            </fieldset>
          </form>
        </CategoriesModal>
      </Dialog.Root>
    </div>
  );
};
export default CreateCategory;
