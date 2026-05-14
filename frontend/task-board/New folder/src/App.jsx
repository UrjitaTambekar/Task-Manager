import React, { useState } from "react";
import "./App.css";

import Header from "./components/Header";
import Board from "./components/Board";
import OnlineUsers from "./components/OnlineUsers";
import ActivityFeed from "./components/ActivityFeed";
import TeamSidebar from "./components/TeamSidebar";
import Notification from "./components/Notification";

import Createtask from "./pages/Createtask.jsx";
export default function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Design UI", status: "Todo", priority: "High" },
    { id: 2, title: "Build API", status: "Progress", priority: "Medium" },
    { id: 3, title: "Testing App", status: "Done", priority: "Low" },
  ]);

  const [notifications, setNotifications] = useState([]);

  // 🔥 CORE FUNCTION (DRAG & DROP CONNECTOR)
  const moveTask = (id, newStatus) => {
    setTasks((prev) => {
      const updated = prev.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      );

      const movedTask = prev.find((t) => t.id === id);

      setNotifications((n) => [
        `Task "${movedTask.title}" moved to ${newStatus}`,
        ...n,
      ]);

      return updated;
    });
  };

  return (
    <div className="app-layout">

      {/* 📌 HEADER */}
      <Header />

      <div className="main-grid">

        {/* 👥 LEFT SIDEBAR */}
        <TeamSidebar />

        {/* 📋 CENTER BOARD */}
        <Board tasks={tasks} moveTask={moveTask} />

        {/* 📊 RIGHT PANEL */}
        <div className="right-panel">
          <OnlineUsers />
          <ActivityFeed tasks={tasks} />
          <Notification notifications={notifications} />
        </div>

      </div>
    </div>
  );
}