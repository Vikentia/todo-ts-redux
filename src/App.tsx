
import { ChangeEvent, useState } from 'react';
import s from './App.module.scss';
import Task from './components/Task/Task'

export type TaskType = {
  id: number
  title: string
  isDone: boolean
}

export const App = () => {
  const [name, setName] = useState<string>('My Todo')
  const [todo, setTodo] = useState<TaskType[]>([])
  const [value, setValue] = useState<string>('')

  const onChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }

  const addTask = () => {
    if (value) {
      setTodo([...todo, { id: todo.length + 1, title: value, isDone: false }])
      setValue('')
    }
  }

  const deleteTask = (id: number) => {
    setTodo(todo.filter(item => item.id !== id))
  }

  const onChangeStatus = (id: number, value: boolean) => {
    setTodo(todo.map(item => item.id === id ? { ...item, isDone: value } : item))
  }

  const changeTaskTitle = (id: number, value: string) => {
    setTodo(todo.map(item => item.id === id ? { ...item, title: value } : item))
  }

  return (
    <div className={s.App}>
      <div className={s.container}>
        <div className={s.title}>{name}</div>
        <div className={s.inputBlock}>
          <input value={value} onChange={onChangeHandle} />
          <button onClick={addTask}>Добавить</button>
        </div>
        <div className={s.taskBlock} >
          {
            todo.map(item => <Task
              key={item.id}
              item={item}
              deleteTask={deleteTask}
              onChangeStatus={onChangeStatus}
              changeTaskTitle={changeTaskTitle}
            />)
          }
        </div>
      </div>
    </div>
  );
}