import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./home.jsx";
import Tasks from './toDoTasks.jsx';
import DoingTasks from "./DoingTasks.jsx";
import AddTaskForm from "./addTaskForm.jsx";
import { useState } from "react";
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setcompletedTasks] = useState([]);
  const [completedTasksCount, setCompletedTasksCount] = useState(0);
  const [toDoTasksCount, setToDoTasksCount] = useState(0);
  
  function addTask(taskData) {
    setTasks(prev => [...prev, taskData]);
    handleToDoTasksCount()
  }

  function handleToDoTasksCount() {
    setToDoTasksCount(tasks.length);
  }

  function handleCompleteTask(taskId) {
    console.log(taskId);
    const taskToComplete = tasks.find((task) => task.id === taskId);
    if (taskToComplete) {
      setcompletedTasks(prev => [...prev, taskToComplete]);
      setTasks(prev => prev.filter((task) => task.id !== taskId));
      setCompletedTasksCount(tasks.length);
      handleToDoTasksCount();
    }
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home tasks={tasks} completedTasksCount = {completedTasksCount} toDoTaskCount = {toDoTasksCount}/>} />

        <Route path="/toDoTasks" element={<Tasks tasks={tasks} onCompleted={handleCompleteTask} />} />

        <Route path="/addTaskForm" element={<AddTaskForm onSubmitTask={addTask} />} />

        <Route path="/doingTasks" element={<DoingTasks tasks={tasks} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
