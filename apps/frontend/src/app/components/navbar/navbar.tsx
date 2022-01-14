import { useState } from 'react';
import { ListBulletIcon, Cross1Icon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';
import styles from './navbar.module.css';

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  return (
    <div>
      <div className={styles.navbar}>
        <Link to="#" className={styles.menu_bars}>
          <ListBulletIcon onClick={showSidebar} />
        </Link>
      </div>
      <nav className={sidebar ? styles.nav_menu_active : styles.nav_menu}>
        <ul className={styles.nav_menu_items}>
          <li className={styles.navbar_toggle}>
            <Link to="#" className={styles.menu_bars}>
              <Cross1Icon onClick={showSidebar} />
            </Link>
          </li>
          <li className={styles.nav_text}>Transacciones</li>
          <li className={styles.nav_text}>Categorias</li>
          <li className={styles.nav_text}>Perfil</li>
        </ul>
      </nav>
    </div>
  );
};
export default Navbar;
