import React from "react";
import { useDrop, useDrag } from "react-dnd";

const ItemType = "TASK";

export default function Board({
  tasks,
  moveTask,
  onTaskClick,
}) {
  const columns = [
    {
      title: "Todo",
      status: "todo",
      dot: "todo",
    },

    {
      title: "In Progress",
      status: "in-progress",
      dot: "progress",
    },

    {
      title: "Done",
      status: "completed",
      dot: "done",
    },
  ];

  return (
    <div className="board">
      {columns.map((column) => (
        <Column
          key={column.status}
          column={column}
          tasks={tasks.filter(
            (task) => task.status === column.status
          )}
          moveTask={moveTask}
          onTaskClick={onTaskClick}
        />
      ))}
    </div>
  );
}

function Column({
  column,
  tasks,
  moveTask,
  onTaskClick,
}) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemType,

    drop: (item) => {
      if (item.status !== column.status) {
        moveTask(item.id, column.status);
      }
    },

    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className="column"
      style={{
        background: isOver
          ? "#1e293b"
          : "#0f172a",
        transition: "0.2s ease",
      }}
    >
      {/* HEADER */}

      <div className="column-header">
        <div className="column-title">
          <div
            className={`column-dot ${column.dot}`}
          />

          <h2>{column.title}</h2>
        </div>

        <div className="task-count">
          {tasks.length}
        </div>
      </div>

      {/* EMPTY STATE */}

      {tasks.length === 0 && (
        <div className="empty-column">
          Drop tasks here
        </div>
      )}

      {/* TASKS */}

      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onTaskClick={onTaskClick}
        />
      ))}
    </div>
  );
}

function TaskCard({
  task,
  onTaskClick,
}) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType,

    item: {
      id: task._id,
      status: task.status,
    },

    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className="task-card"
      onClick={() => onTaskClick(task)}
      style={{
        opacity: isDragging ? 0.4 : 1,

        transform: isDragging
          ? "scale(1.03)"
          : "scale(1)",

        transition: "0.2s ease",

        cursor: "grab",
      }}
    >
      {/* TOP */}

      <div className="task-top">
        <h3 className="task-title">
          {task.title}
        </h3>

        <span
          className={`priority ${task.priority}`}
        >
          {task.priority}
        </span>
      </div>

      {/* DESCRIPTION */}

      <p
        style={{
          marginTop: "12px",
          color: "#94a3b8",
          fontSize: "14px",
          lineHeight: "1.5",
        }}
      >
        {task.description}
      </p>

      {/* FOOTER */}

      <div className="task-footer">
        <div className="user">
          <div className="avatar">
            {task.assignedTo?.name
              ?.charAt(0)
              ?.toUpperCase() || "U"}
          </div>

          <span>
            {task.assignedTo?.name ||
              "Unassigned"}
          </span>
        </div>

        <span className="task-time">
          {task.createdAt
            ? new Date(
                task.createdAt
              ).toLocaleDateString()
            : "No Date"}
        </span>
      </div>
    </div>
  );
}