import styles from './Data.module.css';
import {Link} from 'react-router-dom';

const Data = ({ userName, completedTasksCount, toDoTaskCount }) => {
    const totalTasks = (completedTasksCount || 0) + (toDoTaskCount || 0);
    const completionPercentage = totalTasks > 0 
        ? Math.round(((completedTasksCount || 0) / totalTasks) * 100) 
        : 0;
    
    const lastAccess = new Date().toLocaleDateString("hr-HR", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });

    return (
    <div className={styles.wrapper}>
        <div className={styles.creditsContainer}>
            <header className={styles.header}>
                <h2 className={styles.title}>Profile</h2>
            </header>
            <main className={styles.main}>
                <div className={styles.dataTextContainer}>
                    <div className={styles.dataItem}>
                        <span className={styles.label}>Username:</span>
                        <span className={styles.value}>{userName || "Not Set"}</span>
                    </div>
                    
                    <div className={styles.dataItem}>
                        <span className={styles.label}>To-Do Tasks:</span>
                        <span className={styles.value}>{toDoTaskCount || 0}</span>
                    </div>
                    
                    <div className={styles.dataItem}>
                        <span className={styles.label}>Completed Tasks:</span>
                        <span className={styles.value}>{completedTasksCount || 0}</span>
                    </div>
                    
                    <div className={styles.dataItem}>
                        <span className={styles.label}>Total Tasks:</span>
                        <span className={styles.value}>{totalTasks}</span>
                    </div>
                    
                    <div className={styles.dataItem}>
                        <span className={styles.label}>Completion Rate:</span>
                        <span className={styles.value}>{completionPercentage}%</span>
                    </div>
                    
                    <div className={styles.dataItem}>
                        <span className={styles.label}>Last Access:</span>
                        <span className={styles.value}>{lastAccess}</span>
                    </div>
                    
                    <div className={styles.dataItem}>
                        <span className={styles.label}>App Version:</span>
                        <span className={styles.value}>2.0.0</span>
                    </div>
                </div>
                <Link 
                className={styles.backButton}
                to="/settings">
                Back
                </Link>
            </main>
        </div>
    </div>
  );
}

export default Data;
