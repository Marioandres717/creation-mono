import { GET_CATEGORY } from '../../services/category';
import { useLazyQuery, useMutation } from '@apollo/client';
import { Category } from '@creation-mono/shared/types';
import { useEffect, useState } from 'react';
import { DELETE_CATEGORY } from '../../services/category';
import { Cross2Icon } from '@radix-ui/react-icons';
import styles from './categoryCards.module.css';
import { useHistory } from 'react-router-dom';
type Nullable<T> = T | null;
type Props = {
  onSelected: (id: string) => void;
};
const CategoryCards = ({ onSelected }: Props) => {
  const historyStateId = useHistory().location.state;
  const [getCategory, { data }] = useLazyQuery(GET_CATEGORY);
  const [deleteCategory] = useMutation(DELETE_CATEGORY, {
    onCompleted: () => {
      window.location.reload();
    },
  });
  const [active, setActive] = useState(historyStateId);
  const handleClick = (id: Nullable<string> | undefined) => {
    deleteCategory({
      variables: {
        id: id,
      },
    });
  };
  useEffect(() => {
    getCategory();
  }, [getCategory]);

  const selectedCard = (id: string) => {
    onSelected(id);
    setActive(id);
  };

  useEffect(() => {
    setActive(historyStateId);
  }, [historyStateId]);
  return (
    <div className={styles.cards}>
      {data?.categories.map((category: Category) => {
        return (
          <div
            key={category.id}
            className={
              active === category.id ? styles['card-active'] : styles.card
            }
            onClick={() => {
              const idSelected = category.id || '';
              selectedCard(idSelected);
            }}
          >
            <Cross2Icon
              onClick={() => handleClick(category.id)}
              className={styles.button}
            />
            <ul className={styles['list-container']}>
              <li className={styles['list-item']}>{category.name}</li>
            </ul>
          </div>
        );
      })}
    </div>
  );
};
export default CategoryCards;
