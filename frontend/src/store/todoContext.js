import { createContext, useReducer } from "react";

export const TodoItemsContext = createContext({
  tasks: [],
  dispatchAction: () => {},
});
const tasksReducer = (curTasks, action) => {
  let newTasks = curTasks;
  if (action.type === "LOAD_TASK") {
    return action.payload;
  } else if (action.type === "ADD_TASK") {
    if (!curTasks) return (newTasks = [action.payload.list]);
    else return (newTasks = [...curTasks, action.payload.list]);
  } else if (action.type === "START") {
    newTasks = curTasks.map((task) =>
      task._id === action.payload
        ? {
            ...task,
            isActive:1,
            startTime: Date.now(),
            status: 2,
            isPaused: false,
            isCompleted: false,
            pauseStep: [{ type: "start", time: Date.now() }],
          }
        : task
    );
  } else if (action.type === "PAUSE") {
    newTasks = curTasks.map((task) =>
      task._id === action.payload
        ? {
            ...task,
            isActive:0,
            isPaused: true,
            isCompleted: false,
            pauseStep: [...task.pauseStep, { type: "pause", time: Date.now() }],
          }
        : task
    );
  } else if (action.type === "RESUME") {
    newTasks = curTasks.map((task) =>
      task._id === action.payload
        ? {
            ...task,
            isActive:1,
            isPaused: false,
            pauseStep: [
              ...task.pauseStep,
              { type: "resume", time: Date.now() },
            ],
          }
        : task
    );
  } else if (action.type === "END") {
    newTasks = curTasks.map((task) =>
      task._id === action.payload.id
        ? {
            ...task,
            isActive:0,
            endTime: Date.now(),
            status: 3,
            isCompleted: true,
            pauseStep: [...task.pauseStep, { type: "end", time: Date.now() }],
          }
        : task
    );
  }
  return newTasks;
};

export const TodoItemsContextProvider = ({ children }) => {
  const [tasks, dispatchAction] = useReducer(tasksReducer, []);
  return (
    <TodoItemsContext.Provider value={{ tasks, dispatchAction }}>
      {children}
    </TodoItemsContext.Provider>
  );
};
