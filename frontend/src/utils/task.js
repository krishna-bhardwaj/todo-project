import { TASK_ACTIONS, TASK_STATUS } from "../constants";

export const getTaskStatus = (lastAction) => {
  switch (lastAction) {
    case TASK_ACTIONS.START:
    case TASK_ACTIONS.RESUME:
      return TASK_STATUS.IN_PROGRESS;
    case TASK_ACTIONS.PAUSE:
      return TASK_STATUS.PAUSED;
    case TASK_ACTIONS.CREATE:
      return TASK_STATUS.NOT_STARTED;
    case TASK_ACTIONS.COMPLETE:
      return TASK_STATUS.COMPLETED;
    default:
      return TASK_STATUS.NOT_STARTED;
  }
};
