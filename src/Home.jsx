import styles from './home.module.css';
import TaskFilterBtn from "./taskFilterBtn.jsx";
import Navigation from './Navigation.jsx';
import Statistics from './Statistics.jsx';

export default function Home({ 
  completedTasksCount, 
  toDoTaskCount, 
  userName, 
  statisticsData,
  streak = 1 // možeš proslijediti iz parent komponente
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.navContainer}>
        <Navigation /> 
      </div>

      <main className={styles.mainContainer}>
        <div className={styles.greetingContainer}>
          <h1 className={styles.mainTitle}>
            Hi {userName} 👋
          </h1>
          {streak >= 0 && (
            <div className={styles.streak}>
              🔥 <strong>{streak}</strong> day streak!
            </div>
          )}
        </div>

        <div className={`${styles.dailyMsgContainer} ${styles.container}`}>
          <h2 className={`${styles.subtitle} ${styles.dailyMsgTitle}`}>Daily Message</h2>
          <p className={styles.dailyMsg}>
            "The secret of getting ahead is getting started." – Mark Twain
          </p>
          <div className={styles.quoteDecoration}>✦</div>
        </div>

        <div className={styles.weeklyTasksContainer}>
          <h2 className={styles.subtitle}>Your Tasks</h2>
          <div className={styles.flexContainer}>
            <div className={styles.inProgressTasksContainer}>
              <div className={styles.tasksContainer}>
                <TaskFilterBtn 
                  text="To Do" 
                  taskNum={toDoTaskCount} 
                  to="/toDoTasks" 
                />
              </div>
            </div>
            <div className={`${styles.tasksContainer} ${styles.doneTasksContainer}`}>
              <TaskFilterBtn 
                text="Done" 
                taskNum={completedTasksCount} 
                to="/DoneTasks" 
              />
            </div>
          </div>
        </div>
        
        <div className={`${styles.statisticsContainer} ${styles.container}`}>
          <Statistics data={statisticsData}/>
        </div>
      </main>
    </div>
  );
}