import { Transaction } from '@creation-mono/shared/types';

const transactions = [
  { amount: '15000', date: '2022-02-03T17:37:14.023Z', isExpense: 0 } /*0*/,
  { amount: '25400', date: '2022-02-03T17:37:14.023Z', isExpense: 1 } /*1*/,
  { amount: '3600', date: '2022-02-03T17:37:14.023Z', isExpense: 0 } /*2*/,
  { amount: '80200', date: '2022-02-05T17:37:14.023Z', isExpense: 0 } /*3*/,
  { amount: '16000', date: '2022-02-06T17:37:14.023Z', isExpense: 0 } /*4*/,
  { amount: '22000', date: '2022-02-06T17:37:14.023Z', isExpense: 1 } /*5*/,
  { amount: '17000', date: '2022-02-09T17:37:14.023Z', isExpense: 0 } /*6*/,
];
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
const processGraphData = (transactions: Transaction[]) => {
  const graphData = transactions.reduce(
    (reducedData: any, transaction: Transaction) => {
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
  return Object.keys(graphData).map((key) => graphData[key]);
};

// const dataTransaction = (transactions: Transaction[]) => {
//   const newArr: Transaction[] = [transactions[0]];
//   let newObject = {};
//   let date = '';
//   let amount = 0;
//   let amount2 = 0;
//   let isExpense;

//   for (let i = 1; i < transactions.length; i++) {
//     const lastItem = newArr[newArr.length - 1];

//     const transaction = transactions[i];
//     if (transaction.date === lastItem.date) {
//       if (transaction.isExpense === lastItem.isExpense) {
//         lastItem.amount =
//           parseFloat(lastItem.amount) + parseFloat(transaction.amount);
//         lastItem.date = transaction.date;
//       } else {
//         amount2 = amount2 + parseFloat(transaction.amount);
//         newObject = { amount2 };
//         Object.assign(lastItem, newObject);
//       }
//       // lastItem.amount =
//       //   parseFloat(lastItem.amount) + parseFloat(transaction.amount);
//       // lastItem.date = transactions[i].date;
//     } else {
//       isExpense = transaction.isExpense;
//       amount = parseFloat(transaction.amount);
//       date = transaction.date;
//       newObject = { amount, date, isExpense };
//       newArr.push(newObject);
//     }
//   }
//   return newArr;
// };
// dataTransaction(transactions);

// const formatDate = (transaction: Array<Transaction>) => {
//   const months = [
//     'Enero',
//     'Febrero',
//     'Marzo',
//     'Abil',
//     'Mayo',
//     'Junio',
//     'Julio',
//     'Agosto',
//     'Septiembre',
//     'Octubre',
//     'Noviembre',
//     'Diciembre',
//   ];
//   for (let i = 0; i < transaction.length; i++) {
//     if (transaction[i].date) {
//       const newDate = new Date(transaction[i].date);
//       transaction[i].date =
//         newDate.getDate() +
//         ' ' +
//         months[newDate.getMonth()] +
//         ' ' +
//         newDate.getFullYear();
//     }
//   }
//   return transaction;
// };
// formatDate(transactions);

// const results = (data1: Transaction[], data2: Transaction[]) => {
//   const newArr = data1;
//   let amount2 = 0;
//   let newObject = {};
//   for (let i = 0; i < data2.length; i++) {
//     const founded = newArr
//       .filter((items: Transaction) => items.date === data2[i].date)
//       .pop();
//     if (founded) {
//       amount2 = data2[i].amount;
//       newObject = { amount2 };
//       Object.assign(founded, newObject);
//     } else {
//       newArr.push(data2[i]);
//     }
//   }
//   return newArr;
// };
