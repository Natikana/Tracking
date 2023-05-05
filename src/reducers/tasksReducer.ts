import {TasksType} from "../App";
import {v1} from "uuid";
import {AddTodoListType, RemoveTodoListType} from "./todoListReducer";

export const tasksReducer = (state: TasksType, action: ActionsTasksType) => {
    switch (action.type) {
        case 'DELETE-TASK':
            return {...state, [action.idTodo]: state[action.idTodo].filter(el => el.id !== action.idTask)}
        case 'ADD-TASK':
            let newTask = {id: v1(), title: action.title, isDone: false}
            return {...state, [action.idTodo]: [newTask, ...state[action.idTodo]]}
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.idTodo]: state[action.idTodo].map(el => el.id === action.idTask ? {
                    ...el,
                    isDone: action.status
                } : el)
            }
        case "UPDATE-TASK-TITLE":
            return {
                ...state,
                [action.idTodo]: state[action.idTodo].map(el => el.id === action.idTask ? {
                    ...el,
                    title: action.title
                } : el)
            }
        case "ADD-TODOLIST":
            return {...state, [action.idTodo]: []}
        case "REMOVE-TODOLIST":
            delete state[action.idTodo]
            return {...state}
        default:
            return state
    }
}
//Type
export type ActionsTasksType =
    DeleteTaskType
    | AddTaskType
    | ChangeTaskStatusType
    | UpdateTaskTitleType
    | AddTodoListType
    | RemoveTodoListType

type DeleteTaskType = ReturnType<typeof deleteTaskAC>
type AddTaskType = ReturnType<typeof addTaskAC>
type ChangeTaskStatusType = ReturnType<typeof changeTaskStatusAC>
type UpdateTaskTitleType = ReturnType<typeof updateTaskTitleAC>

//AC
export const updateTaskTitleAC = (idTodo: string, idTask: string, title: string) => {
    return {
        type: 'UPDATE-TASK-TITLE',
        idTodo,
        idTask,
        title
    } as const
}
export const changeTaskStatusAC = (idTodo: string, idTask: string, status: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        idTodo,
        idTask,
        status
    } as const
}
export const deleteTaskAC = (idTodo: string, idTask: string) => {
    return {
        type: 'DELETE-TASK',
        idTodo,
        idTask
    } as const
}
export const addTaskAC = (idTodo: string, title: string) => {
    return {
        type: 'ADD-TASK',
        idTodo,
        title
    } as const
}

