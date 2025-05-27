import { useState } from "react";
import { Play, Pause, StopCircle, History, Trash2, Plus } from "lucide-react";
import { Button } from "../../components";

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
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-[#282c34] mb-6 text-center">
        Task Manager
      </h1>

      <div className="flex gap-3 mb-8">
        <input
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          placeholder="Enter a task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
        />
        <Button icon={<Plus size={18} />} title="Add Task" onClick={handleAddTask} />
      </div>

      <div className="space-y-4">
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
      </div>
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
