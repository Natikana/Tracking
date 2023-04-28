import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TaskTypeProps} from "../App";




export type TasksType = {
    tasks: TaskTypeProps[]
    title: string
    deleteTaskApp: (idTask: string) => void
    addTaskApp: (newTitle: string) => void
    changeStatusTask: (check: boolean, idTask: string) => void
}
export type FilterType = 'All' | 'Active' | 'Completed'
export const TodoList = (props: TasksType) => {
    const [filter, setFilter] = useState<FilterType>('All')
    const [titleInput, setTitleInput] = useState<string>('')
    const [error, setError] = useState<string|null>(null)

    let filteredTasks = props.tasks

    if (filter === 'Active') filteredTasks = filteredTasks.filter(el => !el.isDone)
    if (filter === 'Completed') filteredTasks = filteredTasks.filter(el => el.isDone)

    const statusTasks = (filter: FilterType) => {
        setFilter(filter)
    }
    const deleteTask = (taskId: string) => {
        props.deleteTaskApp(taskId)
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleInput(e.currentTarget.value)
    }
    const addTask = () => {
        if(titleInput !== '') {
            props.addTaskApp(titleInput.trim())
            setTitleInput('')
        } else {
            setError('The title is required')
        }


    }
    const enterPress = (e:KeyboardEvent<HTMLInputElement>) => {
      if(e.key === 'Enter') {
          addTask()
      }
      setError(null)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    style={{border:error ? 'solid 1px red' : ''}}
                    value={titleInput}
                    onChange={onChangeTitle}
                    onKeyUp={enterPress}
                />
                <button onClick={addTask}>+</button>
                {error && <div style={{color:'red'}}>{error}</div>}
            </div>
            <ul>
                {filteredTasks.map(el => {

                    return (
                        <li key={el.id} style={{opacity:el.isDone ? '0.4' : ''}}>
                            <button onClick={(event) => deleteTask(el.id)}>+</button>
                            <input
                                type="checkbox"
                                checked={el.isDone}
                                onChange={(event)=>props.changeStatusTask(event.currentTarget.checked, el.id)}
                            />
                            <span>{el.title}</span>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button style={{backgroundColor:filter==='All' ? 'yellow' : ''}} onClick={() => statusTasks('All')}>All</button>
                <button style={{backgroundColor:filter==='Active' ? 'yellow' : ''}} onClick={() => statusTasks('Active')}>Active</button>
                <button style={{backgroundColor:filter==='Completed' ? 'yellow' : ''}} onClick={() => statusTasks('Completed')}>Completed</button>
            </div>
        </div>
    )
}