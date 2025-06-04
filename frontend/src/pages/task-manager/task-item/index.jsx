import { useRef, useState } from "react";
import { PenLine, Check, Trash2 } from "lucide-react";
import { ActionButton } from "../../../components";
import { isEnterPressed } from "../../../utils";
import taskApi from "../../../services/tasks";

const TaskItem = ({ task }) => {
  const [isReadOnly, setReadOnly] = useState(true);

  const inputRef = useRef();

  const [deleteTask] = taskApi.useDeleteTaskMutation();
  const [updateTitle] = taskApi.useUpdaateTitleMutation();

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
      if (inputRef) inputRef.current.focus();
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
    <div className="w-full justify-center flex gap-5">
      <input
        className="rounded-xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)] focus:shadow-[0_4px_12px_rgba(0,0,0,0.4)] transition-shadow duration-200 outline-none border-none placeholder-gray-400 bg-white w-1/3"
        defaultValue={task.title}
        readOnly={isReadOnly}
        ref={inputRef}
        onKeyDown={handleKeyDown}
      />
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
    </div>
  );
};

export default TaskItem;
