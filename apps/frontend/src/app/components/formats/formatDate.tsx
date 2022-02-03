import { FC } from 'react';
import clsx from 'clsx';
type Props = {
  className?: string;
  date: Date;
};
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
const FormatDate: FC<Props> = ({ date, className }) => {
  const formatClass = clsx(className);
  const newDate = new Date(date);
  const formattedDate =
    newDate.getDate() +
    '-' +
    months[newDate.getMonth()] +
    '-' +
    newDate.getFullYear();
  return <span className={formatClass}>{formattedDate}</span>;
};
export default FormatDate;
