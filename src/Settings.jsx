import styles from './Settings.module.css';
import Navigation from './navigation';
import { Link} from 'react-router-dom';
const Settings = () => {
    return (
        <div className={styles.wrapper}>
                <div className={styles.navContainer}>
                    <Navigation />
                </div>
            <div className={styles.settingsContainer}>
                <header>
                    <h2 className={styles.title}>Settings</h2>
                </header>
                <main>
                    <Link className={styles.settingContainer} to="/AccountSetting">
                        <img className={styles.settingImg} src={`${import.meta.env.BASE_URL}img/account-icon.png`} alt="human icon" />
                        <h3>Account</h3>
                        <img className={styles.arrowImg} src={`${import.meta.env.BASE_URL}img/right-arrow.png`} alt="arrow pointing right" />
                    </Link>
                    <Link className={styles.settingContainer} to="/Data">
                        <img className={styles.settingImg} src={`${import.meta.env.BASE_URL}img/data-icon.png`} alt="data icon" />
                        <h3>Data</h3>
                        <img className={styles.arrowImg} src={`${import.meta.env.BASE_URL}img/right-arrow.png`} alt="arrow pointing right" />
                    </Link>
                    <Link className={styles.settingContainer} to="/Credits">
                        <img className={styles.settingImg} src={`${import.meta.env.BASE_URL}img/credits-icon.png`} alt="credits icon" />
                        <h3>Credits</h3>
                        <img className={styles.arrowImg} src={`${import.meta.env.BASE_URL}img/right-arrow.png`} alt="arrow pointing right" />
                    </Link>
                </main>
            </div>
        </div>
    );
};

export default Settings;