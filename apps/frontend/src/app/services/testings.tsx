const TotalAmounts = () => {
  const sumTotal = (transaction: any) => {
    const graphData = transaction.reduce((a: any, b: any) => {
      const type = b.isExpense ? 'expense' : 'entry';
      if (a[type]) {
        a[type][type] = parseFloat(a[type][type]) + parseFloat(b.amount);
      } else {
        a[type] = Object.assign(
          {},
          { entry: 0, expense: 0 },
          { [type]: parseFloat(b.amount) }
        );
      }
      return a;
    }, {});
    const dataResults = Object.keys(graphData).map((key) => graphData[key]);
    const organizedData = [
      { entry: dataResults[0].entry, expense: dataResults[1].expense },
    ];
    return organizedData;
  };

  return;
};
