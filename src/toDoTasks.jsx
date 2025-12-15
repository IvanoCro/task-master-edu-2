import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TaskBtns from "./taskBtns";
import styles from './toDoTasks.module.css';
import Navigation from "./navigation";
const Tasks = ({ tasks, onCompleted }) => {  
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const navigate = useNavigate();

  function handleAddTask() {
    navigate("/addTaskForm");
  }

  function handleRemoveTask(i) {
    if (selectedTaskId !== null) {
      onCompleted(selectedTaskId);
    }
  }
  function handleTaskCLick(i) {
    tasks.forEach((task) => {
      if (task.id === i) {
        setSelectedTaskId(i);
      }
    });
}
  return (
    <div className={styles.tasksWrapper}>
      <header className={styles.header}>
         <h2 className={styles.title}>To Do Tasks</h2>
         <button className={styles.exitBtn}>X</button>
      </header>

      <main className={styles.mainContent}>
         <div className={styles.tasksContainer}>
            <ul className={styles.taskList}>
              {tasks.length === 0 ? (
                <p className={styles.noTasksText}>No tasks yet</p>
              ) : (
                tasks.map((task) => (
                  <li key={task.id} 
                  className={styles.taskListItem} 
                  onClick={()=>handleTaskCLick(task.id)} style={{
                    border: task.id === selectedTaskId ? "2px solid blue" : "2px solid transparent",
                    padding: "10px",
                    marginBottom: "5px"
                  }}>
                    <header className={styles.taskHeader}>
                      <h3 className={styles.taskTitle}>{task.title}</h3>
                    </header>
                    <p className={styles.taskDueDateText}>{task.dueDate}</p>
                    <p className={styles.taskDescription}>{task.description}</p>
                  </li>
                ))
              )}
            </ul>

            <div className={styles.taskConfigureBtnsContainer}>
                <TaskBtns 
                  onAddTask={handleAddTask} 
                  onDoneTask={handleRemoveTask} 
                />
            </div>
         </div>
      </main>
      <Navigation />
    </div>
  );
};

export default Tasks;