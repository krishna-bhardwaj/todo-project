import React from "react";
import "../styles/signup.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "../../store/loginContext";
import { TodoItemsContext } from "../../store/todoContext";
const LogIn = () => {
  const { dispatchTasks } = useContext(LoginContext);
  const { dispatchAction } = useContext(TodoItemsContext);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    try {
      const response = await fetch("http://localhost:5000/api/v1/sign_in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.ok) {
        const json = await response.json();
        const loginAction = {
          type: "LOG_IN",
          payload: { username: username },
        };
        dispatchTasks(loginAction);
        const response2 = await fetch("http://localhost:5000/api/v2/getTasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
          }),
        });
        const tasks = await response2.json();
        dispatchAction({ type: "LOAD_TASK", payload: tasks.list});
        navigate("/addTask");
      } else {
        const json = await response.json();
        alert(json.message);
      }
    } catch (error) {
      console.error("An error occurred.", error);
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleLogin}>
        <div className="signup-row">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            required
            className="form-control"
            id="username"
            name="username"
          />
        </div>
        <div className="signup-row">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            minLength={5}
            required
            className="form-control"
            id="password"
            name="password"
          />
        </div>
        <button type="submit" id="signup" className="btn btn-primary">
          Log In
        </button>
      </form>
    </div>
  );
};

export default LogIn;
