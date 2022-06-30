export const ADD_TASK = "ADD_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const CHANGE_TITLE = "CHANGE_TITLE";
export const CHANGE_STATUS = "CHANGE_STATUS";
export const CHANGE_TASK_TITLE = "CHANGE_TASK_TITLE";

export const addTask = (title: string) =>
  ({ type: ADD_TASK, payload: { title } } as const);

export const deleteTask = (id: string) => ({
  type: DELETE_TASK,
  payload: { id },
} as const);

export const changeTitle = (title: string) => ({
  type: CHANGE_TITLE,
  payload: { title },
} as const);

export const changeStatus = (id: string, value: boolean) => ({
  type: CHANGE_STATUS,
  payload: { id, value },
} as const);

export const changeTaskTitle = (id: string, value: string) => ({
  type: CHANGE_TASK_TITLE,
  payload: { id, value },
} as const);

//action types
export type AddTaskActionType = ReturnType<typeof addTask>;
export type DeleteTaskActionType = ReturnType<typeof deleteTask>;
export type ChangeTitleActionType = ReturnType<typeof changeTitle>;
export type ChangeStatusActionType = ReturnType<typeof changeStatus>;
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitle>;
