import styles from './Credits.module.css';
import {Link} from 'react-router-dom';
const Credits = () => {

  return (
    <div className={styles.wrapper}>
        <div className={styles.creditsContainer}>
            <header className={styles.header}>
                <h2 className={styles.title}>Credits</h2>
            </header>
            <main className={styles.main}>
                <div className={styles.creditsTextContainer}>
                    <p>© 2026</p>
                    <p>Ivano Zirdum</p>
                    <p>All rights reserved.</p>

                    <p>Designed & developed by </p>
                    <p>Ivano Zirdum</p>
                </div>
                <Link 
                className={styles.backButton}
                to="/Settings">
                Back
                </Link>
            </main>
        </div>
    </div>
  );
}

export default Credits;
