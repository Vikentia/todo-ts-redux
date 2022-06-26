import { ChangeEvent, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import s from "./App.module.scss";
import Task from "./components/Task/Task";
import {
    addTask,
    changeStatus,
    changeTaskTitle,
    changeTitle,
    deleteTask,
} from "./redux/actions/todoActions";
import { AppStateType } from "./redux/store";
import "./index.css";

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};

type FilteredTaskType = "all" | "active" | "done";

export const App = () => {
    const [value, setValue] = useState<string>("");
    const [isEnabled, setIsEnabled] = useState<boolean>(false);
    const name = useSelector<AppStateType, string>((state) => state.todo.title);
    const tasks = useSelector<AppStateType, TaskType[]>(
        (state) => state.todo.tasks
    );
    const [filteredTasks, setFilteredTasks] = useState<FilteredTaskType>("all");
    // const [filteredTasks, setFilteredTasks] = useState<string>("all");
    const dispatch = useDispatch();
    const onChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
    };

    const createTask = () => {
        if (value) {
            dispatch(addTask(value));
            setValue("");
        }
    };
    const removeTask = (id: string) => {
        dispatch(deleteTask(id));
    };
    const onChangeStatus = (id: string, value: boolean) => {
        dispatch(changeStatus(id, value));
    };
    const updateTaskTitle = (id: string, value: string) => {
        dispatch(changeTaskTitle(id, value));
    };
    const changeMainTitle = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTitle(e.currentTarget.value));
    };
    const setFilter = (e: ChangeEvent<HTMLSelectElement>) => {
        setFilteredTasks(e.target.value as FilteredTaskType);
        console.log(filteredTasks);
    };

    return (
        <div className={s.App}>
            <div className={s.container}>
                <div className={s.title}>
                    {isEnabled ? (
                        <input
                            value={name}
                            onChange={changeMainTitle}
                            onBlur={() => setIsEnabled(false)}
                            autoFocus
                        />
                    ) : (
                        <div onDoubleClick={() => setIsEnabled(true)}>
                            {name}
                        </div>
                    )}
                </div>

                <div className={s.inputBlock}>
                    <input value={value} onChange={onChangeHandle} autoFocus />
                    <button onClick={createTask}>Добавить</button>
                </div>

                <div className={s.filterBlock}>
                    <select onChange={setFilter}>
                        <option value={"all"}>Все задачи</option>
                        <option value={"done"}>Завершенные задачи</option>
                        <option value={"active"}>Незавершенные задачи</option>
                    </select>
                </div>

                <div className={s.taskBlock}>
                    {tasks
                        .filter((item) => {
                            switch (filteredTasks) {
                                case "done":
                                    return item.isDone;
                                case "active":
                                    return !item.isDone;
                                case "all":
                                default:
                                    return item;
                            }
                        })
                        .map((item) => (
                            <Task
                                key={item.id}
                                item={item}
                                deleteTask={removeTask}
                                onChangeStatus={onChangeStatus}
                                changeTaskTitle={updateTaskTitle}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
};
