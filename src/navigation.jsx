import styles from './navigation.module.css';
import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav className={styles.navContainer}>
      <ul className={styles.navList}>
        <li>
          <Link to="/">
            <img className={styles.navIcon} src="/img/tasks_icon.png" alt="task icon" />
          </Link>
        </li>

        <li>
          <Link to="/">
            <img className={styles.navIcon} src="/img/focus_icon.png" alt="focus icon" />
          </Link>
        </li>

        <li>
          <Link to="/">
            <img className={styles.navIcon} src="/img/home_icon.png" alt="home icon" />
          </Link>
        </li>

        <li>
          <Link to="/">
            <img className={styles.navIcon} src="/img/breathing_icon.png" alt="breathing icon" />
          </Link>
        </li>

        <li>
          <Link to="/">
            <img className={styles.navIcon} src="/img/search_icon.png" alt="search icon" />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
