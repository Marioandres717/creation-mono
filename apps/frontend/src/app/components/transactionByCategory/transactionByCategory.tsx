import { Category, Transaction } from '@creation-mono/shared/types';
import { BarChartIcon } from '@radix-ui/react-icons';
import { useHistory } from 'react-router-dom';
import FormatAmount from '../formats/formatAmount';
import styles from './transactionByCategory.module.css';

type Props = {
  transactions: Transaction[];
  categories: Category[];
};

const TransactionsByCategory = ({ transactions, categories }: Props) => {
  const history = useHistory();
  const goToCategoryDetails = (id: string) => {
    history.push('/categories', id);
  };
  const categoriesList = categories.map((category) => {
    const filterTransactions = transactions.filter(
      (transaction) => transaction.category?.id === category.id
    );
    const getTotalAmounts = filterTransactions.reduce(
      (reducedValue: Transaction['amount'], transaction: Transaction) => {
        const type = transaction.isExpense ? 'expense' : 'entry';
        reducedValue[type] =
          reducedValue[type] + parseFloat(transaction.amount);
        return reducedValue;
      },
      { expense: 0, entry: 0 }
    );
    const expense = getTotalAmounts.expense;
    const entry = getTotalAmounts.entry;
    const totalAmountsByCategory =
      entry > expense
        ? Number(entry) - Number(expense)
        : Number(expense) - Number(entry);

    return (
      <div className={styles.card} key={category.id}>
        <span className={styles.title}>{category.name}</span>
        <FormatAmount
          amount={totalAmountsByCategory}
          className={
            entry > expense ? styles['amount-green'] : styles['amount-red']
          }
        />
        <div className={styles['image-container']}>
          <BarChartIcon className={styles.image} />
        </div>
        <div className={styles['button-container']}>
          <button
            className={styles.button}
            onClick={() => goToCategoryDetails(category.id || '')}
          >
            Detalles
          </button>
        </div>
      </div>
    );
  });
  return <div className={styles.container}>{categoriesList}</div>;
};
export default TransactionsByCategory;
