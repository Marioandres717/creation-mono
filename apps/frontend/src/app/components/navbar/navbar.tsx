import { useState } from 'react';
import {
  ListBulletIcon,
  HomeIcon,
  LayersIcon,
  CameraIcon,
} from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';
import styles from './navbar.module.css';

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  return (
    <div className={sidebar ? styles['container-active'] : styles.container}>
      <div className={styles.navbar}>
        <div className={styles.menu_bars}>
          <ListBulletIcon className={styles.icons} onClick={showSidebar} />
        </div>
      </div>
      <nav>
        <ul className={styles['nav-menu-items']}>
          <li className={styles.nav_text}>
            <Link to="/" className={styles.link}>
              <HomeIcon className={styles.icons} />
              <span className={styles.title}>Home</span>
            </Link>
          </li>
          <li className={styles.nav_text}>
            <Link to="/categories" className={styles.link}>
              <LayersIcon className={styles.icons} />
              <span className={styles.title}>Categorías</span>
            </Link>
          </li>
          <li className={styles.nav_text}>
            <Link to="/profile" className={styles.link}>
              <CameraIcon className={styles.icons} />
              <span className={styles.title}>Profile</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Navbar;
