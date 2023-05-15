import React from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import cl from './TodoList.module.css'
import {TaskTypeProps, TodoListsType} from "../../App";
import {EditableSpan} from "../EditableSpan";
import {AddItemForm} from "../AddItemForm";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../store";
import {changeFilterTodoListAC, removeTodoListAC, updateTitleTodoListAC} from "../../reducers/todoListReducer";
import {addTaskAC, changeTaskStatusAC, deleteTaskAC, updateTaskTitleAC} from "../../reducers/tasksReducer";


export type TodoListProps = {
    todoList: TodoListsType
}

export enum FilterType {
    all = 'All',
    active = 'Active',
    completed = 'Completed'
}

export const styleBtn = {
    maxWidth: '38px',
    maxHeight: '38px',
    minWidth: '38px',
    minHeight: '38px',
}

export const TodoList = ({todoList}: TodoListProps) => {
    const {id, filter, title} = todoList
    let tasks = useSelector<RootReducerType, TaskTypeProps[]>(state => state.tasks[id])
    const dispatch = useDispatch()


    if (filter === 'Active') tasks = tasks.filter(el => !el.isDone)
    if (filter === 'Completed') tasks = tasks.filter(el => el.isDone)

    const statusTasks = (filter: FilterType) => {
        dispatch(changeFilterTodoListAC(id, filter))
    }
    const deleteTask = (taskId: string) => {
        dispatch(deleteTaskAC(id, taskId))
    }
    const deleteTodo = () => {
        dispatch(removeTodoListAC(id))
    }
    const addItemForm = (newTitle: string) => {
        dispatch(addTaskAC(id, newTitle))
    }
    const updateTitleSpan = (newTitle: string) => {
        dispatch(updateTitleTodoListAC(id, newTitle))

    }

    return (
        <div className={cl.todoItem}>
            <h3>
                <EditableSpan
                    title={title}
                    updateTitleSpan={updateTitleSpan}
                />
                <IconButton aria-label="delete" onClick={deleteTodo}>
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <AddItemForm addTaskApp={addItemForm}/>
            <ul>
                {tasks.map(el => {
                    const updateTitleTask = (newTitle: string) => {
                        dispatch(updateTaskTitleAC(id, el.id, newTitle))
                    }
                    return (
                        <li key={el.id} style={{opacity: el.isDone ? '0.4' : ''}}>
                            <IconButton aria-label="delete" onClick={(event) => deleteTask(el.id)}>
                                <DeleteIcon/>
                            </IconButton>
                            <Checkbox
                                checked={el.isDone}
                                onChange={(event) => dispatch(changeTaskStatusAC(id, el.id, event.currentTarget.checked))}
                            />

                            <EditableSpan title={el.title} updateTitleSpan={updateTitleTask}/>
                        </li>
                    )
                })}
            </ul>
            <div>
                <Button size={'small'} variant={filter === 'All' ? 'contained' : 'outlined'}
                        onClick={() => statusTasks(FilterType.all)}>All</Button>
                <Button size={'small'} variant={filter === 'Active' ? 'contained' : 'outlined'}
                        onClick={() => statusTasks(FilterType.active)}>Active</Button>
                <Button size={'small'} variant={filter === 'Completed' ? 'contained' : 'outlined'}
                        onClick={() => statusTasks(FilterType.completed)}>Completed</Button>
            </div>
        </div>
    )
}