import {
  AddTaskActionType,
  deleteTaskActionType,
  ADD_TASK,
  DELETE_TASK,
  changeTitleActionType,
  CHANGE_TITLE,
  CHANGE_STATUS,
  changeStatusActionType,
  changeTaskTitleActionType,
  CHANGE_TASK_TITLE
} from '../actions/todoActions';
import { TaskType } from "../../App";
import { v1 } from "uuid";

const initialState = {
  title: 'My Todo',
  tasks: [
    { id: '1', title: "Первая задача", isDone: false },
    { id: '2', title: "Вторая задача", isDone: true },
  ] as TaskType[],
};

export const todoReducer = (state = initialState, action: ActionsTypes) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: [
          ...state.tasks,
          { id: v1(), title: action.payload.title, isDone: false },
        ],
      };
    case CHANGE_TITLE:
      return {
        ...state,
        title: action.payload.title,
      };

    case DELETE_TASK:
      return { ...state, tasks: state.tasks.filter(task => task.id !== action.payload.id) };

    case CHANGE_STATUS:
      return {
        ...state, tasks: state.tasks.map((item) =>
          item.id === action.payload.id ? { ...item, isDone: action.payload.value } : item
        )
      }
    case CHANGE_TASK_TITLE:
      return { ...state, tasks: state.tasks.map(task => task.id === action.payload.id ? { ...task, title: action.payload.value } : task) }


    default:
      return state;
  }
}

//types
const InitialStateType = typeof initialState;
type ActionsTypes = AddTaskActionType | deleteTaskActionType | changeTitleActionType | changeStatusActionType | changeTaskTitleActionType;
