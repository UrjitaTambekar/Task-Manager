import { useEffect, useState, useCallback } from "react";
import socket from "../services/socket";
import API from "../services/api";

const TaskModal = ({ task, onClose }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  // 📡 Fetch comments (stable function)
  const fetchComments = useCallback(async () => {
    if (!task?._id) return;

    try {
      const res = await API.get(`/tasks/${task._id}/comments`);
      setComments(res.data);
    } catch (err) {
      console.error("Failed to fetch comments:", err);
    }
  }, [task?._id]);

  // 📡 Load comments + socket listener
  useEffect(() => {
    if (!task?._id) return;

    fetchComments();

    const handleNewComment = (data) => {
      if (data.taskId === task._id) {
        setComments((prev) => [...prev, data]);
      }
    };

    socket.on("newComment", handleNewComment);

    return () => {
      socket.off("newComment", handleNewComment);
    };
  }, [task?._id, fetchComments]);

  // 💬 Send comment
  const sendComment = async () => {
    if (!comment.trim()) return;

    try {
      await API.post(`/tasks/${task._id}/comments`, {
        text: comment,
      });

      socket.emit("addComment", {
        taskId: task._id,
        text: comment,
      });

      setComment("");
    } catch (err) {
      console.error("Failed to send comment:", err);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm 
                 flex justify-center items-center z-50"
      onClick={onClose}
    >
      {/* MODAL */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-900 text-white w-full max-w-2xl 
                   rounded-3xl p-6 shadow-2xl border border-slate-700"
      >
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">{task.title}</h2>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-red-400 text-xl"
          >
            ✕
          </button>
        </div>

        {/* DESCRIPTION */}
        <p className="mt-4 text-slate-300">
          {task.description || "No description"}
        </p>

        {/* DETAILS */}
        <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
          <p>
            <span className="text-slate-400">Priority:</span>{" "}
            <span className="font-semibold">{task.priority}</span>
          </p>

          <p>
            <span className="text-slate-400">Status:</span>{" "}
            {task.status}
          </p>

          <p>
            <span className="text-slate-400">Assigned:</span>{" "}
            {task.assignedTo?.name || "Unassigned"}
          </p>

          <p>
            <span className="text-slate-400">Created:</span>{" "}
            {new Date(task.createdAt).toLocaleString()}
          </p>
        </div>

        {/* COMMENTS */}
        <div className="mt-6">
          <h3 className="font-bold mb-3">💬 Comments</h3>

          <div className="max-h-40 overflow-y-auto space-y-2 pr-2">
            {comments.map((c, i) => (
              <div key={i} className="bg-slate-800 p-3 rounded-xl text-sm">
                <span className="font-semibold text-cyan-400">
                  {c.user?.name || "User"}
                </span>{" "}
                {c.text}
              </div>
            ))}
          </div>

          {/* INPUT */}
          <div className="flex gap-2 mt-3">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="@Rahul please review..."
              className="flex-1 bg-slate-800 border border-slate-700 
                         rounded-xl p-2 text-sm outline-none"
            />

            <button
              onClick={sendComment}
              className="bg-cyan-500 px-4 rounded-xl text-sm font-semibold"
            >
              Send
            </button>
          </div>
        </div>

        {/* HISTORY */}
        <div className="mt-6">
          <h3 className="font-bold mb-2">📜 Activity</h3>

          <ul className="text-sm text-slate-400 space-y-1">
            <li>Task Created</li>
            <li>Moved to In Progress</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;