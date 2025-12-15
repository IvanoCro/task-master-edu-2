import styles from './home.module.css';
import TaskFilterBtn from "./taskFilterBtn.jsx";
import Navigation from './navigation.jsx';
export default function Home({completedTasksCount, toDoTaskCount}) {
  
  return (
  <div className={styles.wrapper}>
    <main className={styles.mainContainer}>
        <h1 className={styles.mainTitle}>Hi Ivano</h1>
        <div className="weekly-review-container">
          <h2 className="weekly-review-title">Weekly Review</h2>
          <div className={styles.weeklyTasksContainer}>
            <div className={styles.inProgressTasksContainer}>
              <div className={styles.tasksContainer}>
                <TaskFilterBtn text="To Do" taskNum={toDoTaskCount} to="/toDoTasks"  />
              </div>
              <div className={styles.tasksContainer}>
                <TaskFilterBtn text="Doing" taskNum="19"  to="/doingTasks"/>
              </div>
            </div>
            <div className={`${styles.tasksContainer}  ${styles.doneTasksContainer}`}>
              <TaskFilterBtn text="Done" taskNum={completedTasksCount } />
            </div>
          </div>
        </div>
        <Navigation />
    </main>
  </div>
   
  );
}


