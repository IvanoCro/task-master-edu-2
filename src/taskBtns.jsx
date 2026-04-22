import styles from './taskBtns.module.css';

const TaskBtns = ({onAddTask, onDoneTask, isRemoveBtnAvailable, isAddBtnAvailable}) => {
  return (
    <div className={styles.taskBtnsContainer}>
    {isAddBtnAvailable && (
        <button className={styles.addTaskBtn} onClick={onAddTask}>
            Add Task
        </button>
    )}
    {isRemoveBtnAvailable && (
        <button className={styles.removeTaskBtn} onClick={onDoneTask}>
            Done
        </button>
    )}
    </div>
    );
};

export default TaskBtns;