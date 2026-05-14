import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    // 👥 TEAM WITH ROLES
    team: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        role: {
          type: String,
          enum: ["admin", "member"],
          default: "member",
        },
      },
    ],

    // 📊 AUTO TRACKED
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    // 📌 TASK COUNT (for dashboard cards)
    totalTasks: {
      type: Number,
      default: 0,
    },

    completedTasks: {
      type: Number,
      default: 0,
    },

    // 🟢 STATUS
    status: {
      type: String,
      enum: ["active", "completed"],
      default: "active",
    },

    // 📅 DEADLINE
    deadline: Date,
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);