import { useState } from 'react';
import {
  HomeIcon,
  LayersIcon,
  CameraIcon,
  HamburgerMenuIcon,
} from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';
import styles from './navbar.module.css';
import LogoutButton from '../logoutButton/logoutButton';

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <div className={sidebar ? styles['container-active'] : styles.container}>
      <div className={styles.navbar}>
        <HamburgerMenuIcon
          className={styles['navbar-trigger']}
          onClick={showSidebar}
        />
      </div>
      <nav className={styles['nav-container']}>
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
          <li className={styles.nav_text}>
            <LogoutButton />
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Navbar;
