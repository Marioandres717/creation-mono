import { useState } from 'react';
import { gql, useMutation, ApolloError } from '@apollo/client';

const CATEGORY = gql`
mutation Categories(name:String!){
    insertCategory(category:{name: $name}){
        id
        name
    } 
}
`;

const Categories = () => {
  const [input, setInput] = useState({ name: '' });
  const updateInput = (value: string, type: string) => {
    setInput({ ...input, ...{ [type]: value } });
  };
  return <input type="text" id="name" />;
};
export default Categories;
