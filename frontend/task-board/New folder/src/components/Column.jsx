import { useDrop } from "react-dnd";
import TaskCard from "./TaskCard";

const Column = ({
  status,
  tasks,
  moveTask,
}) => {

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "TASK",

    drop: (item) => {
      moveTask(item.id, status);
    },

    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`column ${
        isOver ? "hover" : ""
      }`}
    >

      <h2>{status}</h2>

      {tasks
        .filter(
          (task) =>
            task.status === status
        )
        .map((task) => (
          <TaskCard
            key={task.id}
            task={task}
          />
        ))}

    </div>
  );
};

export default Column;