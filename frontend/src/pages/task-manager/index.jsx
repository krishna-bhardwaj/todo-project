import { useRef } from "react";
import { Check, UserLock } from "lucide-react";
import { ActionButton } from "../../components";
import { taskApi } from "../../services";
import { isEnterPressed } from "../../utils";
import TaskItem from "./task-item";
import { AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";

const TaskManager = () => {
  const inputRef = useRef();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const { data: tasks = [] } = taskApi.useGetTaskQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [addTask] = taskApi.useAddTaskMutation();

  const handleKeyDown = (e) => {
    if (!isEnterPressed(e)) return;
    handleAddTask();
  };

  const handleAddTask = () => {
    if (!inputRef.current.value) return;
    addTask({ title: inputRef.current.value })
      .unwrap()
      .then(() => {
        inputRef.current.value = "";
      });
  };

  if (!isAuthenticated)
    return (
      <div className="w-full h-full flex justify-center items-center bg-gray-100 flex-col gap-5">
        <UserLock size={100} strokeWidth={2} color="#ccc" />
        <div className="text-2xl text-[#ccc] font-extrabold">Log In First</div>
      </div>
    );

  return (
    <div className="flex flex-col gap-5 py-5 h-full w-full items-center bg-gray-100">
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

      <div className="w-full flex flex-col items-center overflow-scroll py-5">
        <AnimatePresence>
          {tasks.map((task) => (
            <TaskItem task={task} key={task.id} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TaskManager;
