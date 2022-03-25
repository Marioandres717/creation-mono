import { ReactElement, useCallback, useState } from 'react';
import styles from './TabsComponent.module.css';

type Props = {
  title: string;
  index: number;
  setSelectedTab: (index: number) => void;
  selectedTab: number;
};
type Tabs = {
  children: ReactElement[];
};
type Tab = {
  title: string;
};

const TabComponent = () => {
  return (
    <Tabs>
      <Tab title="tab1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam
      </Tab>
      <Tab title="tab2">
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit
      </Tab>
      <Tab title="tab3">
        in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      </Tab>
    </Tabs>
  );
};

export default TabComponent;

const Tab: React.FC<Tab> = ({ children }) => {
  return <div className={styles['tab-panel']}>{children}</div>;
};

const Tabtitle: React.FC<Props> = ({
  title,
  setSelectedTab,
  index,
  selectedTab,
}) => {
  const onClick = useCallback(() => {
    setSelectedTab(index);
  }, [setSelectedTab, index]);
  const isActive = index === selectedTab;
  return (
    <div className={isActive ? styles['tab-item-active'] : styles['tab-item']}>
      <button
        className={isActive ? styles['button-active'] : styles.button}
        onClick={onClick}
      >
        {title}
      </button>
      {isActive ? <div className={styles.indicator} /> : null}
    </div>
  );
};

const Tabs: React.FC<Tabs> = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <div className={styles.container}>
      <div className={styles['tabs-container']}>
        {children.map((item, index) => (
          <Tabtitle
            key={index}
            title={item.props.title}
            index={index}
            setSelectedTab={setSelectedTab}
            selectedTab={selectedTab}
          />
        ))}
      </div>
      {children[selectedTab]}
    </div>
  );
};

export { Tab, Tabtitle };