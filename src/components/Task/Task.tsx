import { ChangeEvent, useState } from "react";
import { TaskType } from "../../App";
import s from "./Task.module.scss";

type TaskPropsType = {
    item: TaskType;
    deleteTask: (id: string) => void;
    onChangeStatus: (id: string, value: boolean) => void;
    changeTaskTitle: (id: string, value: string) => void;
};

const Task = ({ item, ...props }: TaskPropsType) => {
    const [inputValue, setInputValue] = useState<string>(item.title);
    const [isOn, setIsOn] = useState<boolean>(false);

    const removeTask = () => {
        props.deleteTask(item.id);
    };

    const changeTaskStatus = (value: boolean) => {
        props.onChangeStatus(item.id, value);
    };

    const setInputOn = () => {
        setIsOn(true);
    };

    const setInputOff = () => {
        setIsOn(false);
        renameTask();
    };

    const renameTask = () => {
        props.changeTaskTitle(item.id, inputValue);
    };

    const onChangeTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value);
    };

    return (
        <div className={s.taskContainer}>
            <div className={s.taskCheckbox}>
                <input
                    id={`checkbox_${item.id}`}
                    type={"checkbox"}
                    checked={item.isDone}
                    onChange={(e) => changeTaskStatus(e.currentTarget.checked)}
                />
            </div>
            {isOn ? (
                <input
                    value={inputValue}
                    onChange={onChangeTaskTitle}
                    onBlur={setInputOff}
                    autoFocus
                    onKeyPress={(e) => {
                        if (e.key === "Enter") setInputOff();
                    }}
                />
            ) : (
                <div className={s.taskTitle} onDoubleClick={setInputOn}>
                    {/* {item.title} */}
                    <label htmlFor={`checkbox_${item.id}`}> {item.title}</label>
                </div>
            )}
            <button onClick={removeTask}>✘</button>
        </div>
    );
};

export default Task;
