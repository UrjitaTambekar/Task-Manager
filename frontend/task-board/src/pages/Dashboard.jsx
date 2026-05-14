import React, {
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import "../pages/Dashboard.css";

import Board from "../components/Board";
import TeamSidebar from "../components/TeamSidebar";
import TaskModal from "../components/TaskModal";
import Notification from "../components/Notification";

import AdvancedFilters from "../components/AdvancedFilters";
import ReportingDashboard from "../components/ReportingDashboard";
import CalendarView from "../components/CalendarView";
import ExportReport from "../components/ExportReport";

import API from "../services/api";
import socket from "../services/socket";

export default function Dashboard() {

  const navigate = useNavigate();

  /* =====================================================
     STATES
  ===================================================== */

  const [tasks, setTasks] =
    useState([]);

  const [selectedTask,
    setSelectedTask] =
    useState(null);

  const [activities,
    setActivities] =
    useState([]);

  const [filters,
    setFilters] =
    useState({
      search: "",
      priority: "",
      status: "",
    });

  /* =====================================================
     FETCH TASKS
  ===================================================== */

  useEffect(() => {

    fetchTasks();

    /* SOCKET EVENTS */

    socket.on(
      "taskCreated",

      (task) => {

        setTasks((prev) => [
          ...prev,
          task,
        ]);

        addActivity(
          `🆕 ${task.title} created`
        );
      }
    );

    socket.on(
      "taskUpdated",

      (updatedTask) => {

        setTasks((prev) =>
          prev.map((task) =>
            task._id ===
            updatedTask._id
              ? updatedTask
              : task
          )
        );

        addActivity(
          `🔄 ${updatedTask.title} moved to ${updatedTask.status}`
        );
      }
    );

    socket.on(
      "taskDeleted",

      (taskId) => {

        setTasks((prev) =>
          prev.filter(
            (task) =>
              task._id !== taskId
          )
        );

        addActivity(
          "❌ Task deleted"
        );
      }
    );

    return () => {

      socket.off("taskCreated");

      socket.off("taskUpdated");

      socket.off("taskDeleted");
    };

  }, []);

  /* =====================================================
     FETCH FUNCTION
  ===================================================== */

  const fetchTasks = async () => {

    try {

      const res =
        await API.get("/tasks");

      setTasks(res.data);

    } catch (error) {

      console.log(
        "Fetch Error:",
        error
      );
    }
  };

  /* =====================================================
     ACTIVITY
  ===================================================== */

  const addActivity = (text) => {

    setActivities((prev) => [

      {
        text,
        time: new Date(),
      },

      ...prev,
    ]);
  };

  /* =====================================================
     MOVE TASK
  ===================================================== */

  const moveTask =
    async (id, status) => {

    try {

      await API.put(
        `/tasks/${id}`,
        { status }
      );

    } catch (error) {

      console.log(
        "Move Error:",
        error
      );
    }
  };

  /* =====================================================
     FILTERED TASKS
  ===================================================== */

  const filteredTasks =
    tasks.filter((task) => {

      return (

        task.title
          ?.toLowerCase()
          .includes(
            filters.search.toLowerCase()
          )

        &&

        (
          filters.priority === ""

          ||

          task.priority ===
            filters.priority
        )

        &&

        (
          filters.status === ""

          ||

          task.status ===
            filters.status
        )
      );
    });

  /* =====================================================
     STATS
  ===================================================== */

  const stats = [

    {
      title: "Total Tasks",
      value: tasks.length,
      icon: "📋",
    },

    {
      title: "Completed",
      value:
        tasks.filter(
          (task) =>
            task.status ===
            "completed"
        ).length,
      icon: "✅",
    },

    {
      title: "In Progress",
      value:
        tasks.filter(
          (task) =>
            task.status ===
            "in-progress"
        ).length,
      icon: "🚀",
    },

    {
      title: "Overdue",
      value:
        tasks.filter(
          (task) =>
            task.dueDate &&
            new Date(
              task.dueDate
            ) < new Date()
        ).length,
      icon: "⚠️",
    },
  ];

  return (

    <div className="dashboard">

      {/* =====================================================
          NOTIFICATION
      ===================================================== */}

      <Notification />

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="header">

        <div className="header-left">

          <h1>
            🚀 Task Management Board
          </h1>

          <p>
            Manage your projects,
            track progress and
            collaborate with your
            team in real-time.
          </p>

        </div>

        <div
          style={{
            display: "flex",
            gap: "15px",
            alignItems: "center",
          }}
        >

          <div className="live-status">

            <div className="live-dot"></div>

            <span>
              Live Workspace
            </span>

          </div>

          <button
            className="add-btn"
            onClick={() =>
              navigate(
                "/create-task"
              )
            }
          >

            + Create Task

          </button>

        </div>

      </div>

      {/* =====================================================
          STATS
      ===================================================== */}

      <div className="stats-grid">

        {stats.map(
          (stat, index) => (

          <div
            key={index}
            className="stat-card"
          >

            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",

                alignItems:
                  "center",
              }}
            >

              <div>

                <p className="stat-title">
                  {stat.title}
                </p>

                <h2 className="stat-value">
                  {stat.value}
                </h2>

              </div>

              <div
                style={{
                  fontSize: "38px",
                }}
              >
                {stat.icon}
              </div>

            </div>

          </div>
        ))}

      </div>

      {/* =====================================================
          FILTERS
      ===================================================== */}

      <AdvancedFilters
        filters={filters}
        setFilters={setFilters}
      />

      {/* =====================================================
          MAIN GRID
      ===================================================== */}

      <div className="main-grid">

        {/* =====================================================
            LEFT SIDE
        ===================================================== */}

        <div>

          <Board
            tasks={filteredTasks}
            moveTask={moveTask}
            onTaskClick={
              setSelectedTask
            }
          />

        </div>

        {/* =====================================================
            RIGHT SIDEBAR
        ===================================================== */}

        <div
          style={{
            display: "flex",
            flexDirection:
              "column",

            gap: "20px",
          }}
        >

          {/* TEAM */}

          <TeamSidebar />

          {/* REPORT */}

          <ReportingDashboard
            tasks={filteredTasks}
          />

          {/* CALENDAR */}

          <CalendarView
            tasks={filteredTasks}
          />

          {/* EXPORT */}

          <ExportReport
            tasks={filteredTasks}
          />

          {/* ACTIVITY */}

          <div className="sidebar-card">

            <div
              style={{
                display: "flex",

                justifyContent:
                  "space-between",

                alignItems:
                  "center",

                marginBottom:
                  "20px",
              }}
            >

              <h3 className="sidebar-title">
                📡 Activity Feed
              </h3>

              <span
                style={{
                  fontSize: "12px",
                  color: "#94a3b8",
                }}
              >

                Live Updates

              </span>

            </div>

            {activities.length === 0 ? (

              <div
                style={{
                  textAlign:
                    "center",

                  padding:
                    "30px 0",

                  color:
                    "#64748b",
                }}
              >

                No activity yet

              </div>

            ) : (

              activities.map(
                (
                  activity,
                  index
                ) => (

                <div
                  key={index}
                  className="activity-item"
                >

                  <p className="activity-text">
                    {activity.text}
                  </p>

                  <span className="activity-time">

                    {activity.time.toLocaleTimeString()}

                  </span>

                </div>
              ))
            )}

          </div>

        </div>

      </div>

      {/* =====================================================
          TASK MODAL
      ===================================================== */}

      {selectedTask && (

        <TaskModal
          task={selectedTask}
          onClose={() =>
            setSelectedTask(null)
          }
        />
      )}

    </div>
  );
}