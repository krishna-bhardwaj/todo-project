import { SecondaryActionButton } from "../../../../components";
import { TASK_STATUS } from "../../../../constants";
import { taskApi } from "../../../../services";
import { getTaskStatus } from "../../../../utils";
import { CirclePlay, CircleCheck, CirclePause, History } from "lucide-react";

const TaskActions = ({ task, handleGetHistory }) => {
  const [startTask] = taskApi.useStartTaskMutation();
  const [pauseTask] = taskApi.usePauseTaskMutation();
  const [resumeTask] = taskApi.useResumeTaskMutation();
  const [completeTask] = taskApi.useCompleteTaskMutation();
  const taskStatus = getTaskStatus(task.lastAction.name || "");

  const handleStart = () => {
    if (!task.id) return;
    startTask(task.id);
  };

  const handlePause = () => {
    if (!task.id) return;
    pauseTask(task.id);
  };

  const handleResume = () => {
    if (!task.id) return;
    resumeTask(task.id);
  };

  const handleComplete = () => {
    if (!task.id) return;
    completeTask(task.id);
  };
  return (
    <div className="flex">
      {taskStatus === TASK_STATUS.NOT_STARTED && (
        <SecondaryActionButton
          icon={<CirclePlay size={24} />}
          label="Start"
          onClick={handleStart}
        />
      )}
      {taskStatus === TASK_STATUS.PAUSED && (
        <SecondaryActionButton
          icon={<CirclePlay size={24} />}
          label="Resume"
          onClick={handleResume}
        />
      )}
      {taskStatus === TASK_STATUS.IN_PROGRESS && (
        <SecondaryActionButton
          icon={<CirclePause size={24} />}
          label="Pause"
          onClick={handlePause}
        />
      )}
      {taskStatus !== TASK_STATUS.NOT_STARTED &&
        taskStatus !== TASK_STATUS.COMPLETED && (
          <SecondaryActionButton
            icon={<CircleCheck size={24} />}
            label="Mark Complete"
            onClick={handleComplete}
          />
        )}

      <SecondaryActionButton
        icon={<History size={24} />}
        label="See Task History"
        onClick={() => handleGetHistory(task.id)}
      />
    </div>
  );
};

export default TaskActions;
