import React from 'react';
import {TaskTypeProps} from "../../App";
import {AddItemForm} from "../AddItemForm";
import {EditableSpan} from "../EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import cl from './TodoList.module.css'


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
export enum FilterType {
    all='All',
    active='Active',
    completed='Completed'
}

export const styleBtn = {
    maxWidth: '38px',
    maxHeight: '38px',
    minWidth: '38px',
    minHeight: '38px',
}

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
        <div className={cl.todoItem}>
            <h3>
                <EditableSpan
                    title={props.title}
                    updateTitleSpan={updateTitleSpan}
                />
                <IconButton aria-label="delete" onClick={deleteTodo}>
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <AddItemForm addTaskApp={addItemForm}/>
            <ul>
                {filteredTasks.map(el => {
                    const updateTitleTask = (newTitle: string) => {
                        props.updateTitleTaskApp(props.idTodo, el.id, newTitle)
                    }
                    return (
                        <li key={el.id} style={{opacity: el.isDone ? '0.4' : ''}}>
                            <IconButton aria-label="delete" onClick={(event) => deleteTask(el.id)}>
                                <DeleteIcon/>
                            </IconButton>
                            <Checkbox
                                checked={el.isDone}
                                onChange={(event) => props.changeStatusTask(props.idTodo, el.id, event.currentTarget.checked)}
                            />

                            <EditableSpan title={el.title} updateTitleSpan={updateTitleTask}/>
                        </li>
                    )
                })}
            </ul>
            <div>
                <Button size={'small'} variant={props.filter === 'All' ? 'contained' : 'outlined'}
                        onClick={() => statusTasks(FilterType.all)}>All</Button>
                <Button size={'small'} variant={props.filter === 'Active' ? 'contained' : 'outlined'}
                        onClick={() => statusTasks(FilterType.active)}>Active</Button>
                <Button size={'small'} variant={props.filter === 'Completed' ? 'contained' : 'outlined'}
                        onClick={() => statusTasks(FilterType.completed)}>Completed</Button>
            </div>
        </div>
    )
}