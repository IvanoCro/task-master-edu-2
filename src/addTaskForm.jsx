import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navigation from "./navigation";
import styles from "./addTaskForm.module.css";

function AddTaskForm({ tasks, onSubmitTask, onUpdateTask }) {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const { taskId } = useParams();
  const isEditMode = Boolean(taskId);

  const navigate = useNavigate();
  const currentDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (!isEditMode || !Array.isArray(tasks)) return;
    const taskToEdit = tasks.find((t) => t.id === Number(taskId));
    if (taskToEdit) {
      setTaskTitle(taskToEdit.title);
      setTaskDueDate(taskToEdit.dueDate);
      setTaskDescription(taskToEdit.description);
    }
  }, [isEditMode, taskId, tasks]);

  function isDateValid(date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);

    return selectedDate >= today;
  }

  function onFormSubmit(e) {
    e.preventDefault();

    if (taskTitle.trim() === "") {
      alert("Task title cannot be empty.");
      return;
    }

    if (taskDueDate === "") {
      alert("Please select a due date.");
      return;
    }

    if (!isDateValid(taskDueDate)) {
      alert("Due date cannot be in the past.");
      return;
    }

    if (isEditMode) {
      onUpdateTask({
        id: Number(taskId),
        title: taskTitle,
        dueDate: taskDueDate,
        description: taskDescription,
      });
    } else {
      onSubmitTask({
        id: Date.now(),
        title: taskTitle,
        dueDate: taskDueDate,
        description: taskDescription,
        createdAt: new Date().toISOString(),
      });
    }

    navigate("/toDoTasks");
  }

  return (
    <div className={styles.wrapper}>
      <Navigation />
      <div className={styles.addTaskFormContainer}>
        <header className={styles.header}>
          <h2>{isEditMode ? "Edit Task" : "Add Task"}</h2>
        </header>

        <form onSubmit={onFormSubmit} className={styles.addTaskForm}>
          <label className={styles.inputTitle}>Task Title</label>
          <input
            type="text"
            className={styles.input}
            value={taskTitle}
            placeholder="Enter task title..."
            onChange={(e) => setTaskTitle(e.target.value)}
          />

          <div className={styles.taskDateInputContainer}>
            <label className={styles.inputTitle}>Task Due Date</label>
            <div
              className={`${styles.flexContainer} ${styles.dateInputContainer}`}
            >
              <p>From: {currentDate}</p>
              <p>To:</p>
              <input
                type="date"
                min={currentDate}
                className={`${styles.input} ${styles.dateInput}`}
                value={taskDueDate}
                onChange={(e) => setTaskDueDate(e.target.value)}
              />
            </div>
          </div>

          <label className={styles.inputTitle}>Task Description</label>
          <textarea
            className={styles.input}
            value={taskDescription}
            placeholder="Enter task description..."
            onChange={(e) => setTaskDescription(e.target.value)}
          />

          <button type="submit" className={styles.submitButton}>
            {isEditMode ? "Save Changes" : "Add Task"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTaskForm;
