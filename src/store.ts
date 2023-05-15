import { combineReducers, createStore } from 'redux'
import {tasksReducer} from "./reducers/tasksReducer";
import {todoListReducer} from "./reducers/todoListReducer";

export const rootReducer = combineReducers({
    tasks:tasksReducer,
    todos:todoListReducer
})

export const store = createStore(rootReducer)
export type RootReducerType = ReturnType<typeof rootReducer>
//const state = store.getState()