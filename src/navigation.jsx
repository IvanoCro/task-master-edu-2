import styles from './navigation.module.css';
import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className={styles.navContainer}>
      <ul className={styles.navList}>
        <li>
          <Link
            to="/"
            className={`${styles.navLink} ${currentPath === "/" ? styles.active : ""}`}
          >
            <img
              className={styles.navIcon}
              src={`${import.meta.env.BASE_URL}img/home_icon.png`}
              alt="Home"
            />
            <span className={styles.navText}>Home</span>
          </Link>
        </li>
        <li>
          <Link
            to="/toDoTasks"
            className={`${styles.navLink} ${
              currentPath === "/toDoTasks" || currentPath=== "/addTaskForm" ? styles.active : ""
            }`}
          >
            <img
              className={styles.navIcon}
              src={`${import.meta.env.BASE_URL}img/tasks_icon.png`}
              alt="Tasks"
            />
            <span className={styles.navText}>Tasks</span>
          </Link>
        </li>



        <li>
          <Link
            to="/breathingExercise"
            className={`${styles.navLink} ${
              currentPath === "/breathingExercise" ? styles.active : ""
            }`}
          >
            <img
              className={styles.navIcon}
              src={`${import.meta.env.BASE_URL}img/breathing_icon.png`}
              alt="Breathing exercise"
            />
            <span className={styles.navText}>Breathing</span>
          </Link>
        </li>

        <li>
          <Link
            to="/Blog"
            className={`${styles.navLink} ${
              currentPath === "/Blog" ? styles.active : ""
            }`}
          >
            <img
              className={styles.navIcon}
              src={`${import.meta.env.BASE_URL}img/breathing_icon.png`}
              alt="Blog"
            />
            <span className={styles.navText}>Blog</span>
          </Link>
        </li>

        <li>
          <Link
            to="/Ai"
            className={`${styles.navLink} ${
              currentPath === "/Ai" ? styles.active : ""
            }`}
          >
            <img
              className={styles.navIcon}
              src={`${import.meta.env.BASE_URL}img/breathing_icon.png`}
              alt="AI Assistant"
            />
            <span className={styles.navText}>AI</span>
          </Link>
        </li>

        <li>
          <Link
            to="/Plans"
            className={`${styles.navLink} ${
              currentPath === "/Plans" ? styles.active : ""
            }`}
          >
            <img
              className={styles.navIcon}
              src={`${import.meta.env.BASE_URL}img/breathing_icon.png`}
              alt="Plans"
            />
            <span className={styles.navText}>Plan</span>
          </Link>
        </li>

        <li>
          <Link
            to="/Settings"
            className={`${styles.navLink} ${
              currentPath === "/Settings" 
              || currentPath === "/AccountSetting" 
              || currentPath === "/Data"
              || currentPath === "/Credits"  
              ? styles.active : ""
            }`}
          >
            <img
              className={styles.navIcon}
              src={`${import.meta.env.BASE_URL}img/setting.png`}
              alt="Settings"
            />
            <span className={styles.navText}>Settings</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
