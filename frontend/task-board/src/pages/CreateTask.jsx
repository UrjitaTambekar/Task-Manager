import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../pages/CreateTask.css";

export default function CreateTask() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "todo",
    assignedTo: "",
    dueDate: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        title: formData.title,
        description: formData.description,
        priority: formData.priority,
        status: formData.status,
        assignedTo: formData.assignedTo
          ? { name: formData.assignedTo }
          : null,
        dueDate: formData.dueDate,
      };

      const res = await fetch(
        "http://localhost:5000/api/tasks",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Task created successfully");
        navigate("/");
      } else {
        alert(data.message || "Error creating task");
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-task-page">
      <div className="create-task-card">

        <h1>Create Task</h1>

        <form onSubmit={handleSubmit}>

          <input
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option>low</option>
            <option>medium</option>
            <option>high</option>
          </select>

          <input
            name="assignedTo"
            placeholder="Assign user"
            value={formData.assignedTo}
            onChange={handleChange}
          />

          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
          />

          <button disabled={loading}>
            {loading ? "Creating..." : "Create Task"}
          </button>

        </form>
      </div>
    </div>
  );
}