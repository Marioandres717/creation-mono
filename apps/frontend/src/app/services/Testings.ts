import { Transaction } from '@creation-mono/shared/types';

const transactions = [
  { amount: '15000', date: '2022-02-01T17:37:14.023Z', isExpense: 0 } /*0*/,
  { amount: '25400', date: '2022-02-03T17:37:14.023Z', isExpense: 0 } /*1*/,
  { amount: '3600', date: '2022-02-04T17:37:14.023Z', isExpense: 0 } /*2*/,
  { amount: '80200', date: '2022-02-05T17:37:14.023Z', isExpense: 0 } /*3*/,
  { amount: '16000', date: '2022-02-06T17:37:14.023Z', isExpense: 0 } /*4*/,
  { amount: '22000', date: '2022-02-08T17:37:14.023Z', isExpense: 0 } /*5*/,
  { amount: '17000', date: '2022-02-09T17:37:14.023Z', isExpense: 0 } /*6*/,
];
const data = [
  { amount: '15000', date: '1 Febrero 2022', isExpense: 1 },
  { amount: '25400', date: '3 Febrero 2022', isExpense: 1 },
  { amount: '3600', date: '4 Febrero 2022', isExpense: 1 },
  { amount: '80200', date: '5 Febrero 2022', isExpense: 1 },
  { amount: '16000', date: '6 Febrero 2022', isExpense: 1 },
  { amount: '22000', date: '8 Febrero 2022', isExpense: 1 },
  { amount: '17000', date: '9 Febrero 2022', isExpense: 1 },
];

const dataTransaction = (transactions: Transaction[]) => {
  const newArr: Transaction[] = [transactions[0]];
  let newObject = {};
  let date = '';
  let amount = 0;
  for (let i = 1; i < transactions.length; i++) {
    const lastItem = newArr[newArr.length - 1];
    const transaction = transactions[i];
    if (transaction.date === lastItem.date) {
      lastItem.amount =
        parseFloat(lastItem.amount) + parseFloat(transaction.amount);
      lastItem.date = transactions[i].date;
    } else {
      amount = parseFloat(transactions[i].amount);
      date = transactions[i].date;
      newObject = { amount, date };
      newArr.push(newObject);
    }
  }
  return newArr;
};
dataTransaction(transactions);

const formatDate = (transaction: Array<Transaction>) => {
  const months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abil',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  for (let i = 0; i < transaction.length; i++) {
    if (transaction[i].date) {
      const newDate = new Date(transaction[i].date);
      transaction[i].date =
        newDate.getDate() +
        ' ' +
        months[newDate.getMonth()] +
        ' ' +
        newDate.getFullYear();
    }
  }
  return transaction;
};
formatDate(transactions);

const results = (data1: Transaction[], data2: Transaction[]) => {
  const newArr = data1;
  let amount2 = 0;
  let newObject = {};
  for (let i = 0; i < data2.length; i++) {
    const founded = newArr
      .filter((items: Transaction) => items.date === data2[i].date)
      .pop();
    if (founded) {
      amount2 = data2[i].amount;
      newObject = { amount2 };
      Object.assign(founded, newObject);
    } else {
      newArr.push(data2[i]);
    }
  }
  return newArr;
};
results(data, transactions);
