import { createContext, useReducer } from "react";

export const LoginContext = createContext({
  logged_in: 0,
  logged_in_user: "",
  dispatchTasks: () => {},
});

const loginreducer = (curTasks, action) => {
  if (action.type === "LOG_IN") {
    return {
      logged_in: 1,
      logged_in_user: action.payload.username,
    };
  } else if (action.type === "LOG_OUT") {
    return {
      logged_in: 0,
      logged_in_user: "",
    };
  }
};

export const LoginContextProvider = ({ children }) => {
  const [state, dispatchTasks] = useReducer(loginreducer, 0);
  return (
    <LoginContext.Provider value={{ ...state, dispatchTasks }}>
      {children}
    </LoginContext.Provider>
  );
};
