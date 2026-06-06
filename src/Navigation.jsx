import { useState, useEffect } from 'react';
import styles from './navigation.module.css';
import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  // Zatvori "More" izbornik automatski kada se promijeni ruta
  useEffect(() => {
    setIsMoreOpen(false);
  }, [currentPath]);

  // Provjera jesu li aktivni linkovi koji se nalaze unutar "More" izbornika
  const isMoreActive = [
    "/Blog", "/Ai", "/Plans", "/Settings", 
    "/AccountSetting", "/Data", "/Credits", "/Export"
  ].some(path => currentPath === path || (path === "/Settings" && [
    "/AccountSetting", "/Data", "/Credits", "/Export"
  ].includes(currentPath)));

  const toggleMoreMenu = (e) => {
    e.preventDefault();
    setIsMoreOpen(!isMoreOpen);
  };

  return (
    <nav className={styles.navContainer}>
      {/* Pozadina koja zatvara izbornik na klik izvan njega */}
      {isMoreOpen && <div className={styles.backdrop} onClick={() => setIsMoreOpen(false)} />}

      {/* MORE IZBORNIK (Samo za mobitele) */}
      <div className={`${styles.moreMenu} ${isMoreOpen ? styles.moreMenuOpen : ''}`}>
        <ul className={styles.moreList}>
          <li>
            <Link to="/Blog" className={`${styles.navLink} ${currentPath === "/Blog" ? styles.active : ""}`}>
              <img className={styles.navIcon} src={`${import.meta.env.BASE_URL}img/blog-icon.png`} alt="Blog" />
              <span className={styles.moreTextMobile}>Blog</span>
            </Link>
          </li>
          <li>
            <Link to="/Ai" className={`${styles.navLink} ${currentPath === "/Ai" ? styles.active : ""}`}>
              <img className={styles.navIcon} src={`${import.meta.env.BASE_URL}img/ai-icon.webp`} alt="AI Assistant" />
              <span className={styles.moreTextMobile}>AI</span>
            </Link>
          </li>
          <li>
            <Link to="/Plans" className={`${styles.navLink} ${currentPath === "/Plans" ? styles.active : ""}`}>
              <img className={styles.navIcon} src={`${import.meta.env.BASE_URL}img/plan-icon.png`} alt="Plans" />
              <span className={styles.moreTextMobile}>Plan</span>
            </Link>
          </li>
          <li>
            <Link to="/Settings" className={`${styles.navLink} ${
              ["/Settings", "/AccountSetting", "/Data", "/Credits", "/Export"].includes(currentPath) ? styles.active : ""
            }`}>
              <img className={styles.navIcon} src={`${import.meta.env.BASE_URL}img/setting.png`} alt="Settings" />
              <span className={styles.moreTextMobile}>Settings</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* GLAVNA NAVIGACIJSKA TRAKA */}
      <ul className={styles.navList}>
        <li>
          <Link to="/" className={`${styles.navLink} ${currentPath === "/" ? styles.active : ""}`}>
            <img className={styles.navIcon} src={`${import.meta.env.BASE_URL}img/home_icon.png`} alt="Home" />
            <span className={styles.navText}>Home</span>
          </Link>
        </li>

        <li>
          <Link to="/toDoTasks" className={`${styles.navLink} ${currentPath === "/toDoTasks" || currentPath === "/addTaskForm" ? styles.active : ""}`}>
            <img className={styles.navIcon} src={`${import.meta.env.BASE_URL}img/tasks_icon.png`} alt="Tasks" />
            <span className={styles.navText}>Tasks</span>
          </Link>
        </li>

        <li>
          <Link to="/breathingExercise" className={`${styles.navLink} ${currentPath === "/breathingExercise" ? styles.active : ""}`}>
            <img className={styles.navIcon} src={`${import.meta.env.BASE_URL}img/breathing_icon.png`} alt="Breathing" />
            <span className={styles.navText}>Breathing</span>
          </Link>
        </li>

        {/* DRUGE OPCIJE - PRIKAZUJU SE SAMO NA DESKTOPU (skrivene na mobitelu preko CSS-a) */}
        <li className={styles.desktopOnly}>
          <Link to="/Blog" className={`${styles.navLink} ${currentPath === "/Blog" ? styles.active : ""}`}>
            <span className={styles.navText}>Blog</span>
          </Link>
        </li>
        <li className={styles.desktopOnly}>
          <Link to="/Ai" className={`${styles.navLink} ${currentPath === "/Ai" ? styles.active : ""}`}>
            <span className={styles.navText}>AI</span>
          </Link>
        </li>
        <li className={styles.desktopOnly}>
          <Link to="/Plans" className={`${styles.navLink} ${currentPath === "/Plans" ? styles.active : ""}`}>
            <span className={styles.navText}>Plan</span>
          </Link>
        </li>
        <li className={styles.desktopOnly}>
          <Link to="/Settings" className={`${styles.navLink} ${
            ["/Settings", "/AccountSetting", "/Data", "/Credits", "/Export"].includes(currentPath) ? styles.active : ""
          }`}>
            <span className={styles.navText}>Settings</span>
          </Link>
        </li>

        {/* GUMB "MORE" - SAMO ZA MOBITELE */}
        <li className={styles.mobileOnly}>
          <button onClick={toggleMoreMenu} className={`${styles.navLink} ${styles.moreBtn} ${isMoreActive ? styles.active : ""}`}>
            {/* Ovdje stavi neku ikonu za 'More' npr. tri točkice ili hamburger */}
            <img className={styles.navIcon} src={`${import.meta.env.BASE_URL}img/menu-icon.png`} alt="More" /> 
            <span className={styles.navText}>More</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}