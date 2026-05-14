import React from "react";
import API from "../services/api";

export default function TimeTracker({
  task,
  refreshTasks,
}) {

  const startTimer =
    async () => {

      await API.put(
        `/tasks/start-timer/${task._id}`
      );

      refreshTasks();
    };

  const stopTimer =
    async () => {

      await API.put(
        `/tasks/stop-timer/${task._id}`
      );

      refreshTasks();
    };

  return (
    <div className="timer-box">

      <h4>
        Time Spent:
      </h4>

      <p>
        {
          Math.floor(
            task.totalTimeSpent /
              60
          )
        }
        mins
      </p>

      <p>
        Billable Hours:
        {" "}
        {
          task.billableHours
        }
      </p>

      {task.isTimerRunning ? (

        <button
          onClick={
            stopTimer
          }
        >
          Stop Timer
        </button>

      ) : (

        <button
          onClick={
            startTimer
          }
        >
          Start Timer
        </button>

      )}
    </div>
  );
}