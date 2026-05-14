import mongoose from "mongoose";

const taskSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },

      description: String,

      status: {
        type: String,
        enum: [
          "todo",
          "in-progress",
          "completed",
        ],
        default: "todo",
      },

      priority: {
        type: String,
        enum: [
          "low",
          "medium",
          "high",
        ],
        default: "medium",
      },

      assignedTo: {
        name: {
          type: String,
          default:
            "Unassigned",
        },
      },

      dueDate: Date,

      /* =====================
         TIME TRACKING
      ===================== */

      isTimerRunning: {
        type: Boolean,
        default: false,
      },

      timerStartedAt: Date,

      totalTimeSpent: {
        type: Number,
        default: 0,
      },

      billableHours: {
        type: Number,
        default: 0,
      },

      timeLogs: [
        {
          startTime: Date,

          endTime: Date,

          duration: Number,
        },
      ],
    },

    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "Task",
  taskSchema
);