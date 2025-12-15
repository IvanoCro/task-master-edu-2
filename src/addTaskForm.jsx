import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "./navigation";
function AddTaskForm({ onSubmitTask }) {

    const [taskTitle, setTaskTitle] = useState("");
    const [taskDueDate, setTaskDueDate] = useState("");
    const [taskDescription, setTaskDescription] = useState("");

    const navigate = useNavigate();

    function onFormSubmit(e) {
        e.preventDefault();

        const newTask = {
            id: Date.now(),
            title: taskTitle,
            dueDate: taskDueDate,
            description: taskDescription
        };

        onSubmitTask(newTask);

        navigate("/toDoTasks");
    }

    return (
        <>
            <header>
                <h2>Add Task</h2>
            </header>

            <form onSubmit={onFormSubmit}>
                <label htmlFor="task-title">Task Title</label>
                <input type="text" id="task-title" onChange={(e) => setTaskTitle(e.target.value)} />

                <div className="taskDueDateInputContainer">
                    <label htmlFor="task-title">Task Due Date</label>
                    <p>To:</p>
                    <input type="date" id="task-due-date" onChange={(e) => setTaskDueDate(e.target.value)} />
                </div>

                <label htmlFor="task-description">Task Description</label>
                <input type="text" id="task-description" onChange={(e) => setTaskDescription(e.target.value)} />

                <button type="submit">Add Task</button>
            </form>
            <Navigation />
        </>
    );
}

export default AddTaskForm;
