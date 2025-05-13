import React, { useContext, useEffect, useRef, useState } from "react";
import { FaPause, FaPlay, FaThumbsUp } from "react-icons/fa";
import { MdFileDownloadDone } from "react-icons/md";
import ShowLogs from "./ShowLogs";
import { TodoItemsContext } from "../store/todoContext";

const TodoItemTab = ({ todo }) => {
  const [elapsedTime, setElapsedTime] = useState(todo.duration);
  const { dispatchAction } = useContext(TodoItemsContext);
  const [popUp, setPopUp] = useState(false);
  useEffect(() => {
    let intervalRef = null;

    if (todo.isActive) {
      intervalRef = setInterval(() => {
        setElapsedTime((time) => time + 1000);
      }, 1000);
    } else {
      clearInterval(intervalRef);
    }

    return () => {
      clearInterval(intervalRef);
    };
  }, [todo.isActive]);
  const formatTime = (milliseconds) => {
    if (milliseconds <= 0) {
      return "0h 0m 0s";
    }

    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const handleStart = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v2/updateTask", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "START",
          id: todo._id,
          user: todo.user,
        }),
      });
      if (response.ok) dispatchAction({ type: "START", payload: todo._id });
      else {
        const errorMessage = await response.json();
        alert(errorMessage.message);
      }
    } catch (error) {
      console.log("Error Occured on clicking start");
    }
  };

  const handlePause = async () => {
    dispatchAction({ type: "PAUSE", payload: todo._id });
    try {
      const response = await fetch("http://localhost:5000/api/v2/updateTask", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "PAUSE",
          id: todo._id,
          user: todo.user,
        }),
      });
    } catch (error) {
      console.log("Error Occured on clicking pause");
    }
  };

  const handleResume = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v2/updateTask", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "RESUME",
          id: todo._id,
          user: todo.user,
        }),
      });
      if (response.ok) {
        dispatchAction({ type: "RESUME", payload: todo._id });
      } else {
        const errorMessage = await response.json();
        alert(errorMessage.message);
      }
    } catch (error) {
      console.log("Error Occured on clicking resume");
    }
  };

  const handleEnd = async () => {
    dispatchAction({
      type: "END",
      payload: { id: todo._id, isPaused: todo.isPaused },
    });
    try {
      const response = await fetch("http://localhost:5000/api/v2/updateTask", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "END",
          id: todo._id,
          user: todo.user,
        }),
      });
    } catch (error) {
      console.log("Error Occured on clicking end.");
    }
  };

  const closePopUp = () => {
    console.log("closePopUp");
    setPopUp(false);
  };

  return (
    <>
      <div className="todoListItem">
        <div className="todoListItemHead">
          <span className="todoTitle" >
            {todo.todoTitle}
          </span>
          <span
            className={`todoStatus ${
              todo.status === 1
                ? "pending"
                : todo.status === 2
                ? "inProgress"
                : "completed"
            }`}
          >
            {todo.status === 1
              ? "Pending"
              : todo.status === 2
              ? "In Progress"
              : "Completed"}
          </span>
        </div>
        <div className="todoItemStats">
          <div className="todoListItemButtons">
            {todo.status === 1 && (
              <button onClick={handleStart} className="listItemButton blue">
                <FaThumbsUp className="listItemIcons iconBlue" /> Start
              </button>
            )}
            {todo.status === 2 && (
              <>
                {!todo.isPaused ? (
                  <button onClick={handlePause} className="listItemButton red">
                    <FaPause className="listItemIcons iconRed" /> Pause
                  </button>
                ) : (
                  <button
                    onClick={handleResume}
                    className="listItemButton yellow"
                  >
                    <FaPlay className="listItemIcons iconYellow" /> Resume
                  </button>
                )}
                <button onClick={handleEnd} className="listItemButton green">
                  <MdFileDownloadDone className="listItemIcons iconGreen" /> End
                </button>
              </>
            )}
            {todo.status === 3 && <div onClick={() => setPopUp(pop=>!pop)} className="popup-control"> {popUp ? <>Hide</>:<>Show</>} logs</div>}
          </div>
          {todo.status !== 1 && (
            <div className="listItemDuration">
              <span>Duration</span> : {formatTime(elapsedTime)}
            </div>
          )}
        </div>
      </div>
      {popUp && <ShowLogs todo={todo} popUp={popUp} />}
    </>
  );
};

export default TodoItemTab;
