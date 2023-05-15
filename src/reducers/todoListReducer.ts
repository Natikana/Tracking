import {TodoListsType} from "../App";
import {FilterType} from "../components/todoList/TodoList";
import {v1} from "uuid";

const todosInitState: Array<TodoListsType> = []
export const todoListReducer = (state = todosInitState, action: ActionsTodoType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(el => el.id !== action.idTodo)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(el => el.id === action.idTodo ? {...el, filter: action.filter} : el)
        case "ADD-TODOLIST":
            return [
                {id: action.idTodo, title: action.title, filter: FilterType.all},
                ...state
            ]
        case "UPDATE-TITLE-TODOLIST":
            return state.map(el => el.id === action.idTodo ? {...el, title: action.title} : el)
        default:
            return state
    }
}

//Type
export type ActionsTodoType = RemoveTodoListType | ChangeFilterTodoListType | AddTodoListType | UpdateTitleTodoListType
export type RemoveTodoListType = ReturnType<typeof removeTodoListAC>
type ChangeFilterTodoListType = ReturnType<typeof changeFilterTodoListAC>
type UpdateTitleTodoListType = ReturnType<typeof updateTitleTodoListAC>
export type AddTodoListType = ReturnType<typeof addTodoListAC>

//AC
export const updateTitleTodoListAC = (idTodo: string, title: string) => {
    return {
        type: 'UPDATE-TITLE-TODOLIST',
        idTodo,
        title,
    } as const
}
export const addTodoListAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        title,
        idTodo: v1(),
    } as const
}
export const removeTodoListAC = (idTodo: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        idTodo,
    } as const
}
export const changeFilterTodoListAC = (idTodo: string, filter: FilterType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        idTodo,
        filter,
    } as const
}