import { SecondaryActionButton } from "../../../../components";
import { TASK_STATUS } from "../../../../constants";
import { useModal } from "../../../../hooks";
import { taskApi } from "../../../../services";
import { getTaskStatus } from "../../../../utils";
import {
  CirclePlay,
  CircleCheck,
  CirclePause,
  History as HistoryIcon,
} from "lucide-react";
import History from "../../history";

const TaskActions = ({ task, updateTask }) => {
  const historyModal = useModal();

  const [startTask] = taskApi.useStartTaskMutation();
  const [pauseTask] = taskApi.usePauseTaskMutation();
  const [resumeTask] = taskApi.useResumeTaskMutation();
  const [completeTask] = taskApi.useCompleteTaskMutation();
  const [getHistory, historyState] = taskApi.useLazyGetHistoryQuery();

  const taskStatus = getTaskStatus(task.lastAction.name || "");

  const handleStart = () => {
    if (!task.id) return;
    startTask(task.id)
      .unwrap()
      .then((res) => {
        updateTask(task.id, res.task);
      });
  };

  const handlePause = () => {
    if (!task.id) return;
    pauseTask(task.id)
      .unwrap()
      .then((res) => {
        updateTask(task.id, res.task);
      });
  };

  const handleResume = () => {
    if (!task.id) return;
    resumeTask(task.id)
      .unwrap()
      .then((res) => {
        updateTask(task.id, res.task);
      });
  };

  const handleComplete = () => {
    if (!task.id) return;
    completeTask(task.id)
      .unwrap()
      .then((res) => {
        updateTask(task.id, res.task);
      });
  };

  const handleHistoryClick = () => {
    if (!task.id) return;
    historyModal.open();
    getHistory(task.id);
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
        icon={<HistoryIcon size={24} />}
        label="See Task History"
        onClick={handleHistoryClick}
      />
      <History
        taskName={task.title}
        taskStatus={taskStatus}
        data={historyState.data}
        isLoading={historyState.isFetching}
        open={historyModal.isOpen}
        onClose={historyModal.close}
      />
    </div>
  );
};

export default TaskActions;
