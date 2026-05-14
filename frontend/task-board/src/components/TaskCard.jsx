import { useDrag } from "react-dnd";

const TaskCard = ({ task }) => {

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",

    // ✅ IMPORTANT: send id + status
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
      className={`bg-slate-800 border border-slate-700 
                  rounded-2xl p-4 cursor-grab 
                  hover:border-cyan-400 transition
                  ${isDragging ? "opacity-40 scale-95" : ""}`}
    >

      {/* TITLE */}
      <h3 className="text-white font-semibold mb-2">
        {task.title}
      </h3>

      {/* PRIORITY */}
      <span
        className={`text-xs px-2 py-1 rounded-full ${
          task.priority === "high"
            ? "bg-red-500/20 text-red-300"
            : task.priority === "medium"
            ? "bg-yellow-500/20 text-yellow-300"
            : "bg-green-500/20 text-green-300"
        }`}
      >
        {task.priority}
      </span>

      {/* FOOTER */}
      <div className="flex justify-between items-center mt-4">

        {/* USER */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-cyan-500 
                          flex items-center justify-center 
                          text-xs font-bold text-white">
            {task.assignedTo?.name?.charAt(0) || "U"}
          </div>

          <span className="text-slate-300 text-sm">
            {task.assignedTo?.name || "Unassigned"}
          </span>
        </div>

        {/* TIME */}
        <span className="text-xs text-slate-500">
          {new Date(task.createdAt).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;