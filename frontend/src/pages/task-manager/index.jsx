import { useState } from "react";
import { Check } from "lucide-react";
import { Play, Pause, StopCircle, History, Trash2, Plus } from "lucide-react";
import { Button, Input } from "../../components";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (!newTask.trim()) return;
    const task = {
      id: Date.now(),
      title: newTask,
      status: "idle",
      logs: [],
    };
    setTasks([...tasks, task]);
    setNewTask("");
  };

  const updateTask = (id, updater) => {
    setTasks(tasks.map((t) => (t.id === id ? updater(t) : t)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleStatusChange = (task, action) => {
    const timestamp = new Date().toISOString();
    updateTask(task.id, (t) => {
      let logs = [...t.logs];
      if (action === "pause" || action === "resume") {
        logs.push({ action, timestamp });
      }
      return { ...t, status: action, logs };
    });
  };

  return (
    <div className="flex flex-col gap-5 py-5 h-full w-full items-center">
      <div className="w-full justify-center flex gap-5">
        <input
          className="rounded-xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)] focus:shadow-[0_4px_12px_rgba(0,0,0,0.4)] transition-shadow duration-200 outline-none border-none placeholder-gray-400 bg-white w-1/3"
          placeholder="Add your task here..."
        />
        <button className="rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)] transition-shadow duration-200 border-none h-full px-4 text-gray-700">
          <Check strokeWidth={3} className="w-5 h-5" />
        </button>
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
