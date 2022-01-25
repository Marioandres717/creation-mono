import { gql } from '@apollo/client';

const INSERT_CATEGORY = gql`
  mutation Categories($name: String!) {
    insertCategory(category: { name: $name }) {
      id
      name
    }
  }
`;

const GET_CATEGORY = gql`
  query GetCategory {
    categories(where: { isSystemDefined: 0 }) {
      name
      id
    }
  }
`;

const DELETE_CATEGORY = gql`
  mutation deleteCategory($id: ID) {
    deleteCategory(where: { id: $id })
  }
`;

export { INSERT_CATEGORY, DELETE_CATEGORY, GET_CATEGORY };
