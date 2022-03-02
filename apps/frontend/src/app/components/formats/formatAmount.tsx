import { FC } from 'react';
import clsx from 'clsx';
type Props = {
  amount: number;
  className?: string;
};
const FormatAmount: FC<Props> = ({ amount, className }) => {
  const formatClass = clsx(className);
  const formatted = new Intl.NumberFormat('en-US').format(amount);
  return <span className={formatClass}>$ {formatted}</span>;
};
export default FormatAmount;
