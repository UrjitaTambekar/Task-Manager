import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // 👤 BASIC INFO
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    // 🖼️ PROFILE
    avatar: {
      type: String,
      default: "",
    },

    // 👥 ROLE SYSTEM
    role: {
      type: String,
      enum: ["admin", "manager", "member"],
      default: "member",
    },

    // 🟢 ONLINE STATUS (REAL-TIME)
    isOnline: {
      type: Boolean,
      default: false,
    },

    lastSeen: {
      type: Date,
    },

    // 🔔 NOTIFICATIONS
    notifications: [
      {
        message: String,
        read: {
          type: Boolean,
          default: false,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);