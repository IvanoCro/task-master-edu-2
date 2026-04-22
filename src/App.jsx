import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
// components
import Home from "./home.jsx";
import Tasks from "./toDoTasks.jsx";
import DoingTasks from "./DoingTasks.jsx";
import AddTaskForm from "./addTaskForm.jsx";
import BreathingExercise from "./Breathing.jsx";
import DoneTasks from "./DoneTasks.jsx";
import Setup from "./Setup.jsx";
import Settings from "./Settings.jsx";
import AccountSetting from "./AccountSetting.jsx";
import Data from "./Data.jsx";
import Credits from "./Credits.jsx";
import Blog from "./Blog.jsx";
import Plans from "./Plans.jsx";
import Ai from "./Ai.jsx";
// styles
import "./App.css";

function App() {
  // ===============================
  // STATE (učitavanje iz localStorage)
  // ===============================

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (!savedTasks) return [];
    const parsed = JSON.parse(savedTasks);
    // Dodaj createdAt ako nedostaje
    return parsed.map(task => ({
      ...task,
      createdAt: task.createdAt || new Date().toISOString()
    }));
  });

  const [completedTasks, setCompletedTasks] = useState(() => {
    const savedCompleted = localStorage.getItem("completedTasks");
    if (!savedCompleted) return [];
    const parsed = JSON.parse(savedCompleted);
    // Dodaj createdAt ako nedostaje
    return parsed.map(task => ({
      ...task,
      createdAt: task.createdAt || new Date().toISOString()
    }));
  });
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem("userName");
  });

  // ===============================
  // LOCAL STORAGE SYNC
  // ===============================

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  }, [completedTasks]);

  // Detektuj veličinu ekrana
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);



  // ===============================
  // LOGIKA
  // ===============================

  function addTask(taskData) {
    setTasks(prev => [...prev, taskData]);
  }

  function updateTask(updatedTask) {
    setTasks(prev =>
      prev.map(task =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  }


  function handleCompleteTask(taskId) {
    const taskToComplete = tasks.find(task => task.id === taskId);
    if (!taskToComplete) return;

    setCompletedTasks(prev => [...prev, taskToComplete]);
    setTasks(prev => prev.filter(task => task.id !== taskId));
  }

  function handleRemoveCompletedTask(taskId) {
    setCompletedTasks(prev =>
      prev.filter(task => task.id !== taskId)
    );
  }

  const toDoTasksCount = tasks.length;
  const completedTasksCount = completedTasks.length;

  // Generiraj zadnjih N dana (3 za mobitel, 7 za desktop)
  const getLastNDays = (n) => {
    const days = [];
    for (let i = n - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(new Date(date.getFullYear(), date.getMonth(), date.getDate()));
    }
    return days;
  };

  const daysToShow = isMobile ? 3 : 7;
  const lastNDays = getLastNDays(daysToShow);

  // Kombiniraj sve taskove (aktivne i završene)
  const allTasks = [...tasks, ...completedTasks];

  const statisticsData = lastNDays.map(dayDate => {
    const dateStr = dayDate.toLocaleDateString("hr-HR", {
      day: "numeric",
      month: "numeric",
    });

    const tasksForDay = allTasks.filter(task => {
      if (!task.createdAt) return false;
      const taskDate = new Date(task.createdAt);
      return (
        taskDate.getFullYear() === dayDate.getFullYear() &&
        taskDate.getMonth() === dayDate.getMonth() &&
        taskDate.getDate() === dayDate.getDate()
      );
    }).length;

    return {
      date: dateStr,
      tasks: tasksForDay,
    };
  });

  useEffect(() => {
    localStorage.setItem("statisticsData", JSON.stringify(statisticsData));
  }, [statisticsData]);

  // ===============================
  // ROUTES
  // ===============================

  return (
    <BrowserRouter basename="/task-master-edu">
      <Routes>

        <Route
          path="/"
          element={
            userName
              ? (
                <Home
                  tasks={tasks}
                  userName={userName}
                  completedTasksCount={completedTasksCount}
                  toDoTaskCount={toDoTasksCount}
                  statisticsData={statisticsData}
                />
              )
              : <Navigate to="/Setup" replace />
          }
        />

        <Route
          path="/toDoTasks"
          element={
            <Tasks
              tasks={tasks}
              onCompleted={handleCompleteTask}
            />
          }
        />
      <Route
        path="/Setup"
        element={<Setup setUserName={setUserName} />}
      />
        <Route
          path="/addTaskForm"
          element={<AddTaskForm onSubmitTask={addTask} />}
        />

        <Route
          path="/addTaskForm/:taskId"
          element={
            <AddTaskForm
              tasks={tasks}
              onSubmitTask={addTask}
              onUpdateTask={updateTask}
            />
          }
        />

        <Route
          path="/doingTasks"
          element={<DoingTasks tasks={tasks} />}
        />

        <Route
          path="/breathingExercise"
          element={<BreathingExercise />}
        />

        <Route
          path="/DoneTasks"
          element={
            <DoneTasks
              tasks={completedTasks}
              onRemoveTask={handleRemoveCompletedTask}
            />
          }
        />

        <Route
        path="/Setup"
        element={
          <Setup
            
          />
        }
      />

        <Route
          path="/Settings"
          element={
            <Settings />
          }
        />

        <Route
          path="/AccountSetting"
          element={
            <AccountSetting setUserName={setUserName} />
          }
        />
        <Route
          path="/Data"
          element={
            <Data 
              userName={userName}
              completedTasksCount={completedTasksCount}
              toDoTaskCount={toDoTasksCount}
            />
          }
        />
        <Route
          path="/Credits"
          element={
            <Credits />
          }
        />

        <Route
          path="/Blog"
          element={
            <Blog />
          }
        />

        <Route
          path="/Plans"
          element={
            <Plans />
          }
        />

        <Route
          path="/Ai"
          element={
            <Ai />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
