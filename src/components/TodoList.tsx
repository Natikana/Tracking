import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TaskTypeProps} from "../App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";


export type TasksType = {
    tasks: TaskTypeProps[]
    idTodo: string
    title: string
    filter: FilterType
    deleteTaskApp: (idTodo: string, idTask: string) => void
    updateTitleTaskApp: (idTodo: string, idTask: string, title: string) => void
    addTaskApp: (idTodo: string, newTitle: string) => void
    changeStatusTask: (idTodo: string, idTask: string, check: boolean) => void
    changeFilterTodo: (idTodo: string, filter: FilterType) => void
    updateTitleTodo: (idTodo: string, title: string) => void
    removeTodo: (idTodo: string) => void
}
export type FilterType = 'All' | 'Active' | 'Completed'
export const TodoList = (props: TasksType) => {

    let filteredTasks = props.tasks

    if (props.filter === 'Active') filteredTasks = filteredTasks.filter(el => !el.isDone)
    if (props.filter === 'Completed') filteredTasks = filteredTasks.filter(el => el.isDone)

    const statusTasks = (filter: FilterType) => {
        props.changeFilterTodo(props.idTodo, filter)
    }
    const deleteTask = (taskId: string) => {
        props.deleteTaskApp(props.idTodo, taskId)
    }
    const deleteTodo = () => {
        props.removeTodo(props.idTodo)
    }
    const addItemForm = (newTitle: string) => {
        props.addTaskApp(props.idTodo, newTitle)
    }
    const updateTitleSpan = (newTitle: string) => {
        props.updateTitleTodo(props.idTodo, newTitle)
    }

    return (
        <div>
            <button onClick={deleteTodo}>x</button>
            <h3>
                <EditableSpan
                    title={props.title}
                    updateTitleSpan={updateTitleSpan}
                />
            </h3>
            <AddItemForm addTaskApp={addItemForm}/>
            <ul>
                {filteredTasks.map(el => {
                    const updateTitleTask = (newTitle: string) => {
                        props.updateTitleTaskApp(props.idTodo, el.id, newTitle)
                    }
                    return (
                        <li key={el.id} style={{opacity: el.isDone ? '0.4' : ''}}>
                            <button onClick={(event) => deleteTask(el.id)}>x</button>
                            <input
                                type="checkbox"
                                checked={el.isDone}
                                onChange={(event) => props.changeStatusTask(props.idTodo, el.id, event.currentTarget.checked)}
                            />
                            <EditableSpan title={el.title} updateTitleSpan={updateTitleTask}/>
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