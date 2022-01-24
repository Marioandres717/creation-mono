import { GETCATEGORY } from '../../services/category';
import {
  createSignalIfSupported,
  useLazyQuery,
  useMutation,
} from '@apollo/client';
import { Category } from '@creation-mono/shared/types';
import { useEffect } from 'react';
import { DELETECATEGORY } from '../../services/category';
import { Cross2Icon } from '@radix-ui/react-icons';
import styles from './categoryCards.module.css';

type Nullable<T> = T | null;
type Props = {
  onSelected: (id: Nullable<string> | undefined) => void;
};
const CategoryCards = ({ onSelected }: Props) => {
  const [getCategory, { data }] = useLazyQuery(GETCATEGORY);
  const [deleteCategory] = useMutation(DELETECATEGORY);
  const handleClick = (id: Nullable<string> | undefined) => {
    deleteCategory({
      variables: {
        id: id,
      },
    });
  };
  useEffect(() => {
    getCategory();
  }, []);

  const selectedCard = (id: any) => {
    onSelected(id);
  };
  return (
    <div className={styles.cards}>
      {data?.categories.map((category: Category) => {
        return (
          <div
            key={category.id}
            className={styles.card}
            onClick={() => selectedCard(category.id)}
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
