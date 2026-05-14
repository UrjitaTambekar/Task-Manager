import React, {
  useState,
  useEffect,
  useCallback,
  lazy,
  Suspense
} from "react";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";

import API from "./services/api";

/* 🔥 LAZY LOAD PAGES */
const Dashboard = lazy(() => import("./pages/Dashboard"));
const CreateTask = lazy(() => import("./pages/CreateTask"));

function App() {
  const [tasks, setTasks] = useState([]);

  const isTouchDevice = () => {
    return (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0
    );
  };

  const getCachedTasks = () => {
    const data = localStorage.getItem("tasks");
    return data ? JSON.parse(data) : [];
  };

  const saveCachedTasks = (data) => {
    localStorage.setItem("tasks", JSON.stringify(data));
  };

  const fetchTasks = useCallback(async () => {
    try {
      const res = await API.get("/tasks/all");
      setTasks(res.data);
      saveCachedTasks(res.data);
    } catch (err) {
      console.log("Using cached data");
    }
  }, []);

  useEffect(() => {
    const cached = getCachedTasks();

    if (cached.length > 0) {
      setTasks(cached);
    }

    fetchTasks();
  }, [fetchTasks]);

  const backend = isTouchDevice()
    ? TouchBackend
    : HTML5Backend;

  const backendOptions = isTouchDevice()
    ? { enableMouseEvents: true }
    : undefined;

  return (
    <BrowserRouter>
      <DndProvider backend={backend} options={backendOptions}>
        <Suspense
          fallback={
            <div style={{
              color: "white",
              textAlign: "center",
              marginTop: "40px"
            }}>
              Loading...
            </div>
          }
        >
          <Routes>
            <Route
              path="/"
              element={<Dashboard tasks={tasks} setTasks={setTasks} />}
            />

            <Route
              path="/create-task"
              element={<CreateTask setTasks={setTasks} />}
            />
          </Routes>
        </Suspense>
      </DndProvider>
    </BrowserRouter>
  );
}

export default App;