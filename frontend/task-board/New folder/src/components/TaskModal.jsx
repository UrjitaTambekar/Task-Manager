const TaskModal = ({ task, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white w-[500px] rounded-3xl p-6 shadow-2xl">

        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            
            {task.title}
          </h2>

          <button
            onClick={onClose}
            className="text-red-500 text-xl"
          >
            ✕
          </button>
        </div>

        <p className="mt-4 text-gray-600">
          {task.description}
        </p>

        <div className="mt-5">
          <p><strong>Priority:</strong> {task.priority}</p>
          <p><strong>Assigned To:</strong> {task.assignedTo}</p>
          <p><strong>Status:</strong> {task.status}</p>
        </div>

        {/* Comments */}
        <div className="mt-6">
          <h3 className="font-bold mb-2">Comments</h3>

          <textarea
            className="w-full border rounded-xl p-3"
            placeholder="@Rahul please review..."
          />
        </div>

        {/* History */}
        <div className="mt-6">
          <h3 className="font-bold mb-2">
            Task History
          </h3>

          <ul className="text-sm text-gray-600">
            <li>Task Created</li>
            <li>Moved to In Progress</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;