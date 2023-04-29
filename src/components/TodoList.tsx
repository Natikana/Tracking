import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TaskTypeProps} from "../App";


export type TasksType = {
    tasks: TaskTypeProps[]
    idTodo: string
    title: string
    filter: FilterType
    deleteTaskApp: (idTodo: string, idTask: string) => void
    addTaskApp: (idTodo: string, newTitle: string) => void
    changeStatusTask: (idTodo: string, idTask: string, check: boolean) => void
    changeFilterTodo: (idTodo: string, filter: FilterType) => void
    removeTodo: (idTodo: string) => void
}
export type FilterType = 'All' | 'Active' | 'Completed'
export const TodoList = (props: TasksType) => {

    const [titleInput, setTitleInput] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    let filteredTasks = props.tasks

    if (props.filter === 'Active') filteredTasks = filteredTasks.filter(el => !el.isDone)
    if (props.filter === 'Completed') filteredTasks = filteredTasks.filter(el => el.isDone)

    const statusTasks = (filter: FilterType) => {
        props.changeFilterTodo(props.idTodo, filter)
        //setFilter(props.filter)
    }
    const deleteTask = (taskId: string) => {
        props.deleteTaskApp(props.idTodo, taskId)
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleInput(e.currentTarget.value)
    }
    const addTask = () => {
        if (titleInput !== '') {
            props.addTaskApp(props.idTodo, titleInput.trim())
            setTitleInput('')
        } else {
            setError('The title is required')
        }


    }
    const enterPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask()
        }
        setError(null)
    }
    const deleteTodo = () => {
        props.removeTodo(props.idTodo)
    }
    return (
        <div>
            <h3>{props.title}
                <button onClick={deleteTodo}>x</button>
            </h3>
            <div>
                <input
                    style={{border: error ? 'solid 1px red' : ''}}
                    value={titleInput}
                    onChange={onChangeTitle}
                    onKeyUp={enterPress}
                />
                <button onClick={addTask}>+</button>
                {error && <div style={{color: 'red'}}>{error}</div>}
            </div>
            <ul>
                {filteredTasks.map(el => {

                    return (
                        <li key={el.id} style={{opacity: el.isDone ? '0.4' : ''}}>
                            <button onClick={(event) => deleteTask(el.id)}>x</button>
                            <input
                                type="checkbox"
                                checked={el.isDone}
                                onChange={(event) => props.changeStatusTask(props.idTodo, el.id, event.currentTarget.checked)}
                            />
                            <span>{el.title}</span>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button style={{backgroundColor: props.filter === 'All' ? 'yellow' : ''}}
                        onClick={() => statusTasks('All')}>All
                </button>
                <button style={{backgroundColor: props.filter === 'Active' ? 'yellow' : ''}}
                        onClick={() => statusTasks('Active')}>Active
                </button>
                <button style={{backgroundColor: props.filter === 'Completed' ? 'yellow' : ''}}
                        onClick={() => statusTasks('Completed')}>Completed
                </button>
            </div>
        </div>
    )
}