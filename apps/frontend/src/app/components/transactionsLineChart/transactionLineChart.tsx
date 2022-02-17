import { useState, useEffect } from 'react';
import { Transaction } from '@creation-mono/shared/types';

import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Legend,
  Tooltip,
} from 'recharts';

import styles from './transactionLineChart.module.css';
import FormatAmount from '../formats/formatAmount';

type Props = {
  transactionsData: Transaction[];
};

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const TransactionsLineChart = ({ transactionsData }: Props) => {
  const [resultsData, setResultsData] = useState<Transaction[]>([]);
  const [totalAmounts, setTotalAmounts] = useState({ expense: 0, entry: 0 });

  const processGraphData = (transactions: Transaction[]) => {
    const graphData = transactions.reduce(
      (reducedData: Transaction['date'], transaction: Transaction) => {
        const type = transaction.isExpense ? 'expense' : 'entry';
        const formatDate = new Date(transaction.date);
        const date = formatDate.getDate() + ' ' + months[formatDate.getMonth()];
        // ' ' +
        // formatDate.getFullYear();

        if (reducedData[date]) {
          reducedData[date][type] = parseFloat(
            reducedData[date][type] + parseFloat(transaction.amount)
          );
        } else {
          reducedData[date] = Object.assign(
            {},
            { entry: 0, expense: 0, date },
            { [type]: parseFloat(transaction.amount) }
          );
        }
        return reducedData;
      },
      {}
    );
    const dataResults = Object.keys(graphData).map((key) => graphData[key]);
    const reorganizedData = dataResults.sort(
      (a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf()
    );
    setResultsData(reorganizedData);
  };

  const sumAmounts = (transactions: Transaction[]) => {
    const getTotalAmounts = transactions.reduce(
      (reducedValue: Transaction['amount'], transaction: Transaction) => {
        const type = transaction.isExpense ? 'expense' : 'entry';
        reducedValue[type] =
          reducedValue[type] + parseFloat(transaction.amount);
        return reducedValue;
      },
      { expense: 0, entry: 0 }
    );
    setTotalAmounts(getTotalAmounts);
  };

  useEffect(() => {
    processGraphData(transactionsData);
    sumAmounts(transactionsData);
  }, [transactionsData]);
  return (
    <div className={styles['line-chart']}>
      <LineChart
        width={500}
        height={200}
        data={resultsData}
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
      >
        <CartesianGrid strokeDasharray="5 5" vertical={false} />
        <XAxis dataKey="date" fontSize={10} />
        <Tooltip />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Line type="monotone" dataKey="expense" stroke="var(--theme-red)" />
        <Line type="monotone" dataKey="entry" stroke="var(--theme-blue)" />
      </LineChart>
      <div className={styles['total-amounts-container']}>
        <div className={styles['amount-box']}>
          <label className={styles.tittle}>Total Ingresos: </label>
          <FormatAmount
            amount={totalAmounts.entry}
            className={styles['amount-entry']}
          />
        </div>
        <div className={styles['amount-box']}>
          <label className={styles.tittle}>Total Gastos: </label>
          <FormatAmount
            amount={totalAmounts.expense}
            className={styles['amount-expense']}
          />
        </div>
      </div>
    </div>
  );
};
export default TransactionsLineChart;
