import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TaskBtns from "./taskBtns";
import styles from "./toDoTasks.module.css";
import Navigation from "./navigation";

const Tasks = ({ tasks, onCompleted }) => {
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [filterOption, setFilterOption] = useState("nearest");
    const navigate = useNavigate();

    function getDaysLeft(dueDate) {
        const currentDate = new Date();
        const taskDueDate = new Date(dueDate);
        return Math.ceil((taskDueDate - currentDate) / (1000 * 60 * 60 * 24));
    }

    function handleAddTask() {
        navigate("/addTaskForm");
    }

    function handleRemoveTask() {
        if (selectedTaskId !== null) {
            onCompleted(selectedTaskId);
            setSelectedTaskId(null);
        }
    }

    function handleEditTask(e, taskId) {
        e.stopPropagation();
        navigate(`/addTaskForm/${taskId}`);
    }

    const filteredTasks = [...tasks].sort((a, b) => {
        const dateA = new Date(a.dueDate);
        const dateB = new Date(b.dueDate);

        if (filterOption === "nearest") {
            return dateA - dateB;
        }

        if (filterOption === "newest") {
            return dateB - dateA;
        }

        if (filterOption === "oldest") {
            return dateA - dateB;
        }

        return 0;
    });

    return (
        <div className={styles.wrapper}>
            <div className={styles.navContainer}>
                <Navigation />
            </div>
            <div className={styles.tasksWrapper}>
                <header className={styles.header}>
                    <h2 className={styles.title}>To Do Tasks</h2>
                </header>
                <main className={styles.mainContent}>
                    <div className={styles.tasksContainer}>
                        <div className={styles.filterContainer}>
                            <select
                                className={styles.filterSelect}
                                value={filterOption}
                                onChange={(e) => setFilterOption(e.target.value)}
                            >
                                <option value="nearest">Nearest deadline</option>
                                <option value="newest">Newest</option>
                                <option value="oldest">Oldest</option>
                            </select>
                        </div>
                        <ul className={styles.taskList}>
                            {filteredTasks.length === 0 ? (
                                <div className={styles.noTasksImageContainer}>
                                    <img 
                                        src={`${import.meta.env.BASE_URL}img/no-tasks.avif`} 
                                        alt="No tasks yet" 
                                        className={styles.noTasksImg}
                                    />
                                    <p className={styles.noTasksText}>No tasks yet</p>
                                </div>
                            ) : (
                                filteredTasks.map(task => (
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
                                                    ? "4px solid rgb(21, 172, 61)"
                                                    : "4px solid transparent"
                                        }}
                                    >
                                        <header className={styles.taskHeader}>
                                            <h3 className={styles.taskTitle}>
                                                {task.title}
                                            </h3>

                                            <img
                                                src={`${import.meta.env.BASE_URL}img/edit-pen.png`}
                                                alt="Edit"
                                                className={styles.editPenImg}
                                                onClick={(e) =>
                                                    handleEditTask(e, task.id)
                                                }
                                            />
                                        </header>
                                        <p className={styles.taskDescription}>
                                            {task.description}
                                        </p>
                                        <div className={styles.flexContainer}>
                                            <p className={styles.taskDueDateText}>
                                                {task.dueDate}
                                            </p>
                                            <p className={styles.daysLeftText}>
                                                {getDaysLeft(task.dueDate)} days left
                                            </p>
                                        </div>
                                    </li>
                                ))
                            )}
                        </ul>

                        <div className={styles.taskConfigureBtnsContainer}>
                            <TaskBtns
                                isAddBtnAvailable={true}
                                isRemoveBtnAvailable={selectedTaskId !== null}
                                onAddTask={handleAddTask}
                                onDoneTask={handleRemoveTask}
                            />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Tasks;