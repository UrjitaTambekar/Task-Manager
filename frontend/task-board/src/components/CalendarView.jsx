import React from "react";

import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";

export default function CalendarView({
  tasks,
}) {

  return (
    <div
      className="calendar-container"
    >

      <h2>
        Task Calendar
      </h2>

      <Calendar />

      <div
        className="calendar-tasks"
      >

        {tasks.map((task) => (

          <div
            key={task._id}

            className="calendar-task"
          >

            <h4>
              {task.title}
            </h4>

            <p>
              Due:
              {" "}

              {task.dueDate
                ? new Date(
                    task.dueDate
                  ).toLocaleDateString()
                : "No Date"}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}