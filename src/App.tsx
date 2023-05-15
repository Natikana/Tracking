import './App.module';
import cl from "./App.module.css"
import {useDispatch, useSelector} from "react-redux";
import React from 'react';
import {AppStyled} from "./components/AppStyled";
import {FilterType, TodoList} from "./components/todoList/TodoList";
import {
    addTodoListAC,
} from "./reducers/todoListReducer";
import {AddItemForm} from "./components/AddItemForm";
import {RootReducerType} from "./store";


export type TaskTypeProps = {
    id: string
    title: string
    isDone: boolean
}
export type TodoListsType = {
    id: string
    title: string
    filter: FilterType
}
export type TasksType = {
    [key: string]: TaskTypeProps[]
}

function App() {

    const todoLists = useSelector<RootReducerType, TodoListsType[]>(state => state.todos)
    const dispatch = useDispatch()

    const addTodo = (newTitle: string) => {
        dispatch(addTodoListAC(newTitle))
    }
    return (
        <div className={cl.App}>
            <AppStyled/>
            <div className={cl.AppWrapper}><AddItemForm addTaskApp={addTodo}/>
                {todoLists.map(el => {
                    return (
                        <TodoList
                            key={el.id}
                            todoList={el}
                        />
                    )
                })}</div>
        </div>
    );
}

export default App;
