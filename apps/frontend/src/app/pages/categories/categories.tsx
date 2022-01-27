import Layout from '../../components/layout/layout';
import CreateCategory from '../../components/createCategory/createCategory';
import CategoryDetails from '../../components/categoryDetails/categoryDetails';
import styles from './categories.module.css';
import { useState } from 'react';
import Navbar from '../../components/navbar/navbar';

const Categories = () => {
  const [categoryId, setCategoryId] = useState('');
  const onCategorySelect = (id: string) => {
    setCategoryId(id);
  };
  return (
    <Layout className={styles.layout}>
      <Navbar />
      <CreateCategory onSelected={(id) => onCategorySelect(id)} />
      <CategoryDetails id={categoryId} />
    </Layout>
  );
};
export default Categories;
