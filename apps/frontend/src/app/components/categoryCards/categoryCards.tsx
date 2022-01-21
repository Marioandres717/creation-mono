import { GETCATEGORY } from '../../services/category';
import { useLazyQuery, useMutation } from '@apollo/client';
import { Category } from '@creation-mono/shared/types';
import { useEffect } from 'react';
import { DELETECATEGORY } from '../../services/category';
import { Cross2Icon } from '@radix-ui/react-icons';
import styles from './categoryCards.module.css';

type Nullable<T> = T | null;
const CategoryCards = () => {
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
  return (
    <div className={styles.cards}>
      {data?.categories.map((category: Category) => {
        return (
          <div key={category.id} className={styles.card}>
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
