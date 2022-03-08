import { Category, Transaction } from '@creation-mono/shared/types';

type Props = {
  transaction: Transaction[];
  categories: Category[];
};

const TransactionsByCategory = ({ transaction, categories }: Props) => {
  console.log(transaction);
  console.log(categories);
  return <div>Hola</div>;
};
export default TransactionsByCategory;
