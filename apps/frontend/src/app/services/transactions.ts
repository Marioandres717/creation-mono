import { gql } from '@apollo/client';

const TRANSACTION = gql`
  mutation transaction(
    $description: String
    $amount: Decimal!
    $date: DateTime
    $categoryId: ID
    $isExpense: Int
  ) {
    insertTransaction(
      transaction: {
        description: $description
        amount: $amount
        isExpense: $isExpense
        type: cash
        categoryId: $categoryId
        date: $date
      }
    ) {
      id
      description
      date
      amount
      isExpense
      type
    }
  }
`;

const GET_TRANSACTION = gql`
  query getTransaction($id: ID, $asc: OrderBy) {
    transactions(where: { id: $id }, orderBy: { date: $asc }) {
      id
      description
      amount
      type
      date
      isExpense
      category {
        id
        name
      }
    }
  }
`;

const DELETE_TRANSACTION = gql`
  mutation deleteTransaction($id: ID) {
    deleteTransaction(where: { id: $id })
  }
`;

const GET_TRANSACTION_CATEGORIES = gql`
  query getTransaction($categoryId: ID) {
    transactions(where: { categoryId: $categoryId }) {
      id
      description
      amount
      type
      date
      category {
        name
      }
    }
  }
`;

const EDIT_TRANSACTION = gql`
  mutation editTransaction(
    $description: String
    $amount: Decimal!
    $date: DateTime
    $type: TransactionType
    $categoryId: ID
    $isExpense: Int
    $id: ID
  ) {
    updateTransaction(
      where: { id: $id }
      transaction: {
        description: $description
        amount: $amount
        isExpense: $isExpense
        type: $type
        categoryId: $categoryId
        date: $date
      }
    ) {
      description
      id
      type
      amount
      category {
        name
      }
    }
  }
`;

export {
  GET_TRANSACTION,
  DELETE_TRANSACTION,
  TRANSACTION,
  GET_TRANSACTION_CATEGORIES,
  EDIT_TRANSACTION,
};
