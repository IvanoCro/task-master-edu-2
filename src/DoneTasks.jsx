import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TaskBtns from "./taskBtns";
import styles from "./toDoTasks.module.css";
import Navigation from "./navigation";

const DoneTasks = ({tasks, onRemoveTask}) => {
    const [selectedTaskId, setSelectedTaskId] = useState(null);

    function handleClearTask() {
        if (selectedTaskId !== null) {
            onRemoveTask(selectedTaskId);
            setSelectedTaskId(null);
        }
    }

    return (
        <div className={styles.wrapper}>
              <Navigation />
        <div className={styles.tasksWrapper}>
            <header className={styles.header}>
                <h2 className={styles.title}>Done Tasks</h2>
            </header>

            <main className={styles.mainContent}>
                <div className={styles.tasksContainer}>
                    <ul className={styles.taskList}>
                        {tasks.length === 0 ? (
                            <p className={styles.noTasksText}>No tasks</p>
                        ) : (
                            tasks.map(task => (
                                <li
                                    key={task.id}
                                    className={styles.taskListItem}
                                    onClick={() =>
                                        setSelectedTaskId(
                                            selectedTaskId === task.id ? null : task.id
                                        )
                                    }
                                    style={{
                                        border:
                                            task.id === selectedTaskId
                                                ? "2px solid #59b7e5ff"
                                                : "2px solid transparent"
                                    }}
                                >
                                    <header className={styles.taskHeader}>
                                        <h3 className={styles.taskTitle}>
                                            {task.title}
                                        </h3>
                                    </header>

                                    <div className={styles.flexContainer}>
                                        <p className={styles.taskDueDateText}>
                                            {task.dueDate}
                                        </p>
                                    </div>

                                    <p className={styles.taskDescription}>
                                        {task.description}
                                    </p>
                                </li>
                            ))
                        )}
                    </ul>

                    <div className={styles.taskConfigureBtnsContainer}>
                        <TaskBtns
                            isAddBtnAvailable={false}
                            isRemoveBtnAvailable={selectedTaskId !== null}
                            onDoneTask={handleClearTask}
                        />
                    </div>
                </div>
            </main>

            
        </div>
    </div>
    );
};

export default DoneTasks;