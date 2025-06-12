import { useRef, useState } from "react";
import { PenLine, Check, Trash2 } from "lucide-react";
import { ActionButton } from "../../../components";
import { getTaskStatus, isEnterPressed } from "../../../utils";
import taskApi from "../../../services/tasks";
import { motion } from "framer-motion";
import TaskActions from "./task-actions";

const TaskItem = ({ task, handleGetHistory }) => {
  const [isReadOnly, setReadOnly] = useState(true);

  const inputRef = useRef();

  const [deleteTask] = taskApi.useDeleteTaskMutation();
  const [updateTitle] = taskApi.useUpdaateTitleMutation();

  const taskStatus = getTaskStatus(task.lastAction.name);

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

  const toggleEditMode = () => {
    if (isReadOnly) {
      setReadOnly(false);
      inputRef.current?.focus();
      return;
    }
    setReadOnly(true);
    handleEdit();
  };

  const handleKeyDown = (e) => {
    if (!isEnterPressed(e)) return;
    if (!isReadOnly) toggleEditMode();
  };

  return (
    <motion.div
      className="w-full justify-center flex gap-5 pb-5 pt-1"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0, padding: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between rounded-xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)] focus-within:shadow-[0_4px_12px_rgba(0,0,0,0.4)] transition-shadow duration-200 w-1/3 bg-white min-w-96 ">
        <div className="flex flex-col gap-1">
          <input
            className="outline-none border-none placeholder-gray-400 bg-white"
            defaultValue={task.title}
            readOnly={isReadOnly}
            ref={inputRef}
            onKeyDown={handleKeyDown}
          />
          <p className="text-xs text-gray-500 capitalize">{taskStatus}</p>
        </div>
        <TaskActions task={task} handleGetHistory={handleGetHistory} />
      </div>

      <ActionButton onClick={toggleEditMode}>
        {isReadOnly ? (
          <PenLine strokeWidth={2} className="w-5 h-5" />
        ) : (
          <Check strokeWidth={3} className="w-5 h-5" />
        )}
      </ActionButton>
      <ActionButton onClick={handleDelete}>
        <Trash2 strokeWidth={2} />
      </ActionButton>
    </motion.div>
  );
};

export default TaskItem;
