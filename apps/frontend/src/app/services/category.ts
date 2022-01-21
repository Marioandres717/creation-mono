import { gql } from '@apollo/client';

const INSERTCATEGORY = gql`
  mutation Categories($name: String!) {
    insertCategory(category: { name: $name }) {
      id
      name
    }
  }
`;
export { INSERTCATEGORY };
const GETCATEGORY = gql`
  query GetCategory {
    categories(where: { isSystemDefined: 0 }) {
      name
      id
    }
  }
`;
export { GETCATEGORY };

const DELETECATEGORY = gql`
  mutation deleteCategory($id: ID) {
    deleteCategory(where: { id: $id })
  }
`;
export { DELETECATEGORY };
