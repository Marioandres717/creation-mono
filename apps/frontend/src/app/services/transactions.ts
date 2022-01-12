import { gql } from '@apollo/client';

const TRANSACTION = gql`
  mutation transaction(
    $description: String
    $amount: Decimal!
    $date: DateTime
    $type: TransactionType
    $categoryId: ID
  ) {
    insertTransaction(
      transaction: {
        description: $description
        amount: $amount
        isExpense: 1
        type: $type
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
export { TRANSACTION };

const GETTRANSACTION = gql`
  query getTransaction {
    transactions(where: { isExpense: 1 }) {
      id
      description
      amount
      type
      date
    }
  }
`;

export { GETTRANSACTION };
