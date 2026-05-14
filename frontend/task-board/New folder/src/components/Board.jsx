import React, { useState } from "react";
import {
  Sparkles,
  Plus,
  Bell,
  Search,
  Users,
  MoreHorizontal,
} from "lucide-react";

import Board from "./components/Board";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Design Landing Page",
      status: "Todo",
      priority: "High",
      assignedTo: "Rahul",
    },

    {
      id: 2,
      title: "Backend API",
      status: "Progress",
      priority: "Medium",
      assignedTo: "Priya",
    },

    {
      id: 3,
      title: "Testing",
      status: "Done",
      priority: "Low",
      assignedTo: "Anurag",
    },
  ]);

  const moveTask = (id, newStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              status: newStatus,
            }
          : task
      )
    );
  };

  return (
    <div className="app">

      <div className="bgGlow blue"></div>
      <div className="bgGlow purple"></div>

      <header className="navbar">

        <div className="logoSection">

          <div className="logoBox">
            <Sparkles size={28} />
export default App;