import { useRef, useState } from "react";
import {
  PenLine,
  Check,
  Trash2,
  Play,
  Pause,
  StopCircle,
  History,
} from "lucide-react";
import { motion } from "framer-motion";
import { isEnterPressed } from "../../../utils";
import taskApi from "../../../services/tasks";

// IconButton Component
const IconButton = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    title={label}
    className="p-2 rounded-full hover:bg-gray-100 text-gray-700"
  >
    {icon}
  </button>
);

const TaskItem = ({ task }) => {
  const [isReadOnly, setReadOnly] = useState(true);
  const inputRef = useRef();

  const [deleteTask] = taskApi.useDeleteTaskMutation();
  const [updateTitle] = taskApi.useUpdaateTitleMutation();

  const toggleEditMode = () => {
    if (isReadOnly) {
      setReadOnly(false);
      if (inputRef) inputRef.current.focus();
      return;
    }
    setReadOnly(true);
    handleEdit();
  };

  const handleEdit = () => {
    if (task.title === inputRef.current.value) return;
    if (!inputRef.current.value) {
      inputRef.current.value = task.title;
      return;
    }
    updateTitle({ title: inputRef.current.value, taskId: task.id });
  };

  const handleDelete = () => {
    if (!task.id) return;
    deleteTask(task.id);
  };

  const handleKeyDown = (e) => {
    if (!isEnterPressed(e)) return;
    if (!isReadOnly) toggleEditMode();
  };

  return (
    <motion.div
      className="flex justify-between items-center bg-white rounded-xl shadow-md p-4 border border-gray-200"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0, padding: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Left: Editable Title + Status */}
      <div className="flex-1">
        <input
          className="text-lg font-medium text-gray-800 bg-transparent focus:outline-none w-full"
          defaultValue={task.title}
          readOnly={isReadOnly}
          ref={inputRef}
          onKeyDown={handleKeyDown}
        />
        <p className="text-sm text-gray-500 capitalize">
          Status: {task.status}
        </p>
      </div>

      {/* Right: Controls */}
      <div className="flex gap-2 items-center ml-4">
        {task.status === "idle" || task.status === "pause" ? (
          <IconButton
            onClick={() => console.log("Start/Resume")}
            icon={<Play size={18} />}
            label="Start/Resume"
          />
        ) : null}

        {task.status === "resume" ? (
          <IconButton
            onClick={() => console.log("Pause")}
            icon={<Pause size={18} />}
            label="Pause"
          />
        ) : null}

        {task.status !== "completed" ? (
          <IconButton
            onClick={() => console.log("Complete")}
            icon={<StopCircle size={18} />}
            label="Complete"
          />
        ) : null}

        <IconButton
          onClick={toggleEditMode}
          icon={isReadOnly ? <PenLine size={18} /> : <Check size={18} />}
          label={isReadOnly ? "Edit" : "Save"}
        />

        <IconButton
          onClick={handleDelete}
          icon={<Trash2 size={18} />}
          label="Delete"
        />

        {task.status === "completed" && task.logs?.length > 0 && (
          <IconButton
            onClick={() => console.log("Show Logs")}
            icon={<History size={18} />}
            label="Logs"
          />
        )}
      </div>
    </motion.div>
  );
};

export default TaskItem;
