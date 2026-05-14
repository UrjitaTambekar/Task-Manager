import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";

import taskRoutes from "./routes/taskRoutes.js";

/* =====================
   LOAD ENV
===================== */

dotenv.config();

/* =====================
   DEBUG ENV
===================== */

console.log(
  "MONGO URI:",
  process.env.MONGO_URI
);

/* =====================
   APP INIT
===================== */

const app = express();

/* =====================
   MIDDLEWARE
===================== */

app.use(
  cors({
    origin: "http://localhost:3000",

    credentials: true,
  })
);

app.use(express.json());

/* =====================
   ROUTES
===================== */

app.use("/api/tasks", taskRoutes);

/* =====================
   DEFAULT ROUTE
===================== */

app.get("/", (req, res) => {

  res.send(
    "Backend Running"
  );

});

/* =====================
   SERVER + SOCKET
===================== */

const server =
  http.createServer(app);

const io = new Server(server, {
  cors: {
    origin:
      "http://localhost:3000",

    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],

    credentials: true,
  },
});

/* =====================
   STORE IO GLOBALLY
===================== */

app.set("io", io);

/* =====================
   SOCKET EVENTS
===================== */

let onlineUsers = [];

io.on(
  "connection",

  (socket) => {

    console.log(
      "User Connected:",
      socket.id
    );

    /* =====================
       ADD ONLINE USER
    ===================== */

    onlineUsers.push(
      socket.id
    );

    io.emit(
      "onlineUsers",
      onlineUsers
    );

    /* =====================
       MOVE TASK
    ===================== */

    socket.on(
      "moveTask",

      (data) => {

        io.emit(
          "taskUpdated",
          data
        );
      }
    );

    /* =====================
       ACTIVITY FEED
    ===================== */

    socket.on(
      "activity",

      (msg) => {

        io.emit(
          "activityFeed",
          msg
        );
      }
    );

    /* =====================
       DISCONNECT
    ===================== */

    socket.on(
      "disconnect",

      () => {

        console.log(
          "User Disconnected:",
          socket.id
        );

        onlineUsers =
          onlineUsers.filter(
            (id) =>
              id !== socket.id
          );

        io.emit(
          "onlineUsers",
          onlineUsers
        );
      }
    );
  }
);

/* =====================
   DATABASE
===================== */

mongoose
  .connect(
    process.env.MONGO_URI
  )

  .then(() => {

    console.log(
      "MongoDB Atlas Connected"
    );

  })

  .catch((err) => {

    console.log(
      "DB Error:",
      err
    );

  });

/* =====================
   START SERVER
===================== */

const PORT =
  process.env.PORT || 5000;

server.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});