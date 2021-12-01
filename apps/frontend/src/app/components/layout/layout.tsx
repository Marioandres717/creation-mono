import { FC, ReactNode } from 'react';
import styles from './layout.module.css';
import clsx from 'clsx';

type Props = {
  children: ReactNode;
  className?: string;
};

const Layout: FC<Props> = ({ children, className }) => {
  const layoutClass = clsx(styles.layout, className);
  return <div className={layoutClass}>{children}</div>;
};
export default Layout;
