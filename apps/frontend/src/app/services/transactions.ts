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
  query getTransaction($id:ID) {
    transactions(where: { id : $id}) {
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
export { GETTRANSACTION };

const DELETETRANSACTION = gql`
  mutation deleteTransaction($id: ID) {
    deleteTransaction(where: { id: $id })
  }
`;
export { DELETETRANSACTION };

const GETTRANSACTIONCATEGORIES=gql`
query getTransaction($categoryId:ID) {
  transactions(where: { categoryId : $categoryId}) {
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
export {GETTRANSACTIONCATEGORIES}


