import { useLazyQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { Transaction } from '@creation-mono/shared/types';
import { GET_TRANSACTION } from '../../services/transactions';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
} from 'recharts';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const TransactionsLineChart = () => {
  const [queryData] = useLazyQuery(GET_TRANSACTION, {
    onCompleted: (data) => {
      const { transactions } = data;
      setTransactionsData(transactions);
    },
    fetchPolicy: 'network-only',
  });
  const [transactionsData, setTransactionsData] = useState<Transaction[]>([]);

  const [resultsData, setResultsData] = useState<Transaction[]>([]);

  const processGraphData = (transactions: Transaction[]) => {
    const graphData = transactions.reduce(
      (reducedData: Transaction['date'], transaction: Transaction) => {
        const type = transaction.isExpense ? 'expense' : 'entry';
        const formatDate = new Date(transaction.date);
        const date =
          formatDate.getDate() +
          ' ' +
          months[formatDate.getMonth()] +
          ' ' +
          formatDate.getFullYear();

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
  useEffect(() => {
    queryData();
    processGraphData(transactionsData);
  }, [transactionsData]);
  return (
    <div>
      <LineChart
        width={500}
        height={200}
        data={resultsData}
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
      >
        <CartesianGrid strokeDasharray="0 0" />
        <XAxis dataKey="date" fontSize={10} />
        <YAxis fontSize={10} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="expense" stroke="red" />
        <Line type="monotone" dataKey="entry" stroke="green" />
      </LineChart>
    </div>
  );
};
export default TransactionsLineChart;
