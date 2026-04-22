import styles from './home.module.css';
import TaskFilterBtn from "./taskFilterBtn.jsx";
import Navigation from './navigation.jsx';
import Statistics from './Statistics.jsx';
export default function Home({completedTasksCount, toDoTaskCount, userName, statisticsData}) {
  return (
  <div className={styles.wrapper}>
  <div className={styles.navContainer}>
    <Navigation /> 
  </div>
  <main className={styles.mainContainer}>
    <h1 className={styles.mainTitle}>Hi {userName}</h1>
    

    <div className={`${styles.dailyMsgContainer} ${styles.container}`}>
      <div className={styles.quotesImgContainerLeft}>
        <img 
        src={`${import.meta.env.BASE_URL}img/quotes.png`} 
        alt="Quotes" 
        className={styles.quotesImg}
        />
      </div>
      <h2 className={`${styles.subtitle} ${styles.dailyMsgTitle}`}>Daily Message</h2>
      <p className={styles.dailyMsg}>"The secret of getting ahead is getting started." – Mark Twain</p>
      <div className={styles.quotesImgContainerRight}>
        <img 
        src={`${import.meta.env.BASE_URL}img/quotes.png`} 
        alt="Quotes" 
        className={styles.quotesImg}
        />
      </div>
    </div>

    <div className={`${styles.weeklyTasksContainer}`}>
    <h2 className={styles.subtitle}>Tasks</h2>
      <div className={styles.flexContainer}>
        <div className={`${styles.inProgressTasksContainer}`}>
          <div className={`${styles.tasksContainer}`}>
            <TaskFilterBtn text="To Do" taskNum={toDoTaskCount} to="/toDoTasks" />
          </div>
        </div>
        <div className={`${styles.tasksContainer} ${styles.doneTasksContainer}`}>
          <TaskFilterBtn text="Done" taskNum={completedTasksCount} to="/DoneTasks" />
        </div>
      </div>
    </div>
    
    <div className={`${styles.statisticsContainer} ${styles.container}`}>
      <Statistics  data={statisticsData}/>
    </div>
</main>
</div>
   
  );
}


