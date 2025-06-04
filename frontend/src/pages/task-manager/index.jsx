import { useRef, useState } from "react";
import { Check } from "lucide-react";
import { Play, Pause, StopCircle, History, Trash2, Plus } from "lucide-react";
import { ActionButton, Button, Input } from "../../components";
import { taskApi } from "../../services";
import { isEnterPressed } from "../../utils";
import TaskItem from "./task-item";

const TaskManager = () => {
  const inputRef = useRef();

  const { data: tasks, isFetching: isTaskListLoading } =
    taskApi.useGetTaskQuery();
  const [addTask] = taskApi.useAddTaskMutation();

  const handleKeyDown = (e) => {
    if (!isEnterPressed(e)) return;
    handleAddTask();
  };

  const handleAddTask = () => {
    if (!inputRef.current.value) return;
    addTask({ title: inputRef.current.value });
  };

  return (
    <div className="flex flex-col gap-5 py-5 h-full w-full items-center">
      <div className="w-full justify-center flex gap-5">
        <input
          className="rounded-xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)] focus:shadow-[0_4px_12px_rgba(0,0,0,0.4)] transition-shadow duration-200 outline-none border-none placeholder-gray-400 bg-white w-1/3"
          placeholder="Add your task here..."
          onKeyDown={handleKeyDown}
          ref={inputRef}
        />
        <ActionButton onClick={handleAddTask}>
          <Check strokeWidth={3} className="w-5 h-5" />
        </ActionButton>
      </div>

      <div className="w-full flex flex-col gap-5 items-center overflow-scroll py-5">
        {!isTaskListLoading && tasks.map((task) => <TaskItem task={task} />)}
      </div>

      {/* <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex justify-between items-center bg-white rounded-xl shadow-md p-4 border border-gray-200"
          >
            <div className="flex-1">
              <p className="text-lg font-medium text-gray-800">{task.title}</p>
              <p className="text-sm text-gray-500 capitalize">Status: {task.status}</p>
            </div>
            <div className="flex gap-2 items-center">
              {task.status === "idle" || task.status === "pause" ? (
                <IconButton
                  onClick={() => handleStatusChange(task, "resume")}
                  icon={<Play size={18} />}
                  label="Start/Resume"
                />
              ) : null}
              {task.status === "resume" ? (
                <IconButton
                  onClick={() => handleStatusChange(task, "pause")}
                  icon={<Pause size={18} />}
                  label="Pause"
                />
              ) : null}
              {task.status !== "completed" ? (
                <IconButton
                  onClick={() => handleStatusChange(task, "completed")}
                  icon={<StopCircle size={18} />}
                  label="Complete"
                />
              ) : null}
              <IconButton
                onClick={() => deleteTask(task.id)}
                icon={<Trash2 size={18} />}
                label="Delete"
              />
              {task.status === "completed" && task.logs.length > 0 && (
                <IconButton
                  onClick={() => alert(JSON.stringify(task.logs, null, 2))}
                  icon={<History size={18} />}
                  label="Logs"
                />
              )}
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
};

const IconButton = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    title={label}
    className="p-2 rounded-full hover:bg-gray-100 text-gray-700"
  >
    {icon}
  </button>
);

export default TaskManager;
