import { useDrop } from "react-dnd";
import TaskCard from "./TaskCard";

const Column = ({ status, tasks, moveTask }) => {

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: "TASK",

    drop: (item) => {
      // ✅ prevent unnecessary updates
      if (item.status !== status) {
        moveTask(item.id, status);
      }
    },

    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const filteredTasks = tasks.filter(
    (task) => task.status === status
  );

  return (
    <div
      ref={drop}
      className={`column transition ${
        isOver && canDrop
          ? "border-cyan-400 bg-slate-800"
          : ""
      }`}
    >

      {/* HEADER */}
      <h2 className="text-white font-bold mb-3">
        {status} ({filteredTasks.length})
      </h2>

      {/* TASK LIST */}
      <div className="space-y-3">
        {filteredTasks.map((task) => (
          <TaskCard
            key={task._id}   {/* ✅ FIXED */}
            task={task}
          />
        ))}
      </div>

    </div>
  );
};

export default Column;