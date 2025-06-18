import { useCallback, useEffect, useRef, useState } from "react";
import { Check, UserLock } from "lucide-react";
import { ActionButton } from "../../components";
import { taskApi } from "../../services";
import { isEnterPressed } from "../../utils";
import TaskItem from "./task-item";
import { AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import Filters from "./filters";

const TaskManager = () => {
  const inputRef = useRef();
  const intersectionObserverRef = useRef();
  const page = useRef(1);

  const [tasks, setTasks] = useState([]);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [getTasks, { data }] = taskApi.useLazyGetTaskQuery();

  const [addTask] = taskApi.useAddTaskMutation();

  const fetchTasks = useCallback(
    (page) => {
      getTasks({ page })
        .unwrap()
        .then((res) => {
          if (page === 1) setTasks((prev) => res.tasks);
          else setTasks((prev) => [...prev, ...res.tasks]);
        });
    },
    [getTasks]
  );

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

  useEffect(() => {
    fetchTasks(page.current);
  }, [fetchTasks]);

  useEffect(() => {
    const currentObserver = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (!entry.isIntersecting) return;
      if (!data?.hasMore) return;
      page.current = page.current + 1;
      fetchTasks(page.current);
    });
    currentObserver.observe(intersectionObserverRef.current);
    return () => currentObserver.disconnect();
  }, [data?.hasMore, fetchTasks]);

  if (!isAuthenticated)
    return (
      <div className="w-full h-full flex justify-center items-center bg-gray-100 flex-col gap-5">
        <UserLock size={100} strokeWidth={2} color="#ccc" />
        <div className="text-2xl text-[#ccc] font-extrabold">Log In First</div>
      </div>
    );

  return (
    <div className="w-full h-full bg-gray-100 flex justify-center">
      <div className="flex flex-col gap-3 py-5 h-full items-center w-7/12">
        <div className="w-full justify-center flex gap-5">
          <input
            className="rounded-xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)] focus:shadow-[0_4px_12px_rgba(0,0,0,0.4)] transition-shadow duration-200 outline-none border-none placeholder-gray-400 bg-white w-2/3"
            placeholder="Add your task here..."
            onKeyDown={handleKeyDown}
            ref={inputRef}
          />
          <ActionButton onClick={handleAddTask}>
            <Check strokeWidth={3} className="w-5 h-5" />
          </ActionButton>
        </div>
        <Filters />

        <div className="w-full flex flex-col items-center overflow-scroll pb-5 scrollbar-hide">
          <AnimatePresence>
            {tasks.map((task) => (
              <TaskItem task={task} key={task.id} />
            ))}
          </AnimatePresence>
          <div className="h-0" ref={intersectionObserverRef} />
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
