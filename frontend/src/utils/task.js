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

export const getLastActions = (status) => {
  switch (status) {
    case TASK_STATUS.NOT_STARTED:
      return [TASK_ACTIONS.CREATE];
    case TASK_STATUS.IN_PROGRESS:
      return [TASK_ACTIONS.START, TASK_ACTIONS.RESUME];
    case TASK_STATUS.PAUSED:
      return [TASK_ACTIONS.PAUSE];
    case TASK_STATUS.COMPLETED:
      return [TASK_ACTIONS.COMPLETE];
    default:
      return [];
  }
};
