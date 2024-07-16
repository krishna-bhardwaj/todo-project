import React from "react";
import { FaArrowDownLong } from "react-icons/fa6";

const ShowLogs = ({ todo, popUp }) => {
  const formatTime = (timestamp) => {
    if (!timestamp) {
      return ""; // handle cases where timestamp is not available
    }
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className={`popUpBox ${popUp ? "" : "hidden"}`}>
      <div style={{ position: "relative" }}>
        {todo.pauseStep.map((step, index) => (
          <div key={index} className="logStep">
            <div className="logContent">
              <span className="logStepType">{step.type}:</span>
              <span>{formatTime(step.time)}</span>
            </div>
            {index < todo.pauseStep.length - 1 && (
              <FaArrowDownLong className="logStepIcon" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowLogs;
