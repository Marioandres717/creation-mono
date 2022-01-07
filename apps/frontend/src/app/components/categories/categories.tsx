import { useState, FormEvent } from 'react';
import { useMutation, ApolloError, useLazyQuery } from '@apollo/client';
import { Category } from '@creation-mono/shared/types';
import { GETCATEGORY, INSERTCATEGORY } from '../../services/category';

const Categories = () => {
  const [input, setInput] = useState({ name: '' });
  const [getCategory, { data }] = useLazyQuery(GETCATEGORY);
  const [category] = useMutation(INSERTCATEGORY);

  const updateForm = (value: string, type: string) => {
    setInput({ ...input, ...{ [type]: value } });
  };
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    category({
      variables: input,
    });
  };
  const handleClick = (e: FormEvent) => {
    e.preventDefault();
    getCategory({
      variables: data,
    });
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          id="name"
          onChange={(e) => {
            updateForm(e.target.value, 'name');
          }}
        />
        <input type="submit" />
      </form>
      <ul>
        {data &&
          data.categories &&
          data.categories.map((category: Category) => {
            return <li key={category.id}>{category.name}</li>;
          })}
      </ul>
      <button onClick={handleClick}>categorias</button>
    </div>
  );
};
export default Categories;
