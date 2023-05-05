import React, {Reducer, useReducer} from 'react';
import './App.module';
import {FilterType, TodoList} from "./components/todoList/TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {AppStyled} from "./components/AppStyled";
import cl from "./App.module.css"
import {
    ActionsTasksType,
    addTaskAC,
    changeTaskStatusAC,
    deleteTaskAC,
    tasksReducer,
    updateTaskTitleAC
} from "./reducers/tasksReducer";
import {
    ActionsTodoType,
    addTodoListAC,
    changeFilterTodoListAC,
    removeTodoListAC,
    todoListReducer,
    updateTitleTodoListAC
} from "./reducers/todoListReducer";

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

    let todoListID1 = v1()
    let todoListID2 = v1()

    const [todoLists, dispatchTodoLists] = useReducer<Reducer<TodoListsType[], ActionsTodoType>>(todoListReducer, [
        {id: todoListID1, title: 'What to learn', filter: FilterType.all},
        {id: todoListID2, title: 'What to buy', filter: FilterType.all},
    ])


    const [tasks, dispatchTasks] = useReducer<Reducer<TasksType, ActionsTasksType>>(tasksReducer, {
        [todoListID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todoListID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })

    const deleteTaskApp = (idTodo: string, idTask: string) => {
        dispatchTasks(deleteTaskAC(idTodo, idTask))
    }
    const addTaskApp = (idTodo: string, newTitle: string) => {
        dispatchTasks(addTaskAC(idTodo, newTitle))
    }
    const changeStatusTask = (idTodo: string, idTask: string, check: boolean) => {
        dispatchTasks(changeTaskStatusAC(idTodo, idTask, check))
    }
    const updateTitleTaskApp = (idTodo: string, idTask: string, title: string) => {
        dispatchTasks(updateTaskTitleAC(idTodo, idTask, title))
    }
    const changeFilterTodo = (idTodo: string, filter: FilterType) => {
        dispatchTodoLists(changeFilterTodoListAC(idTodo, filter))
    }

    const updateTitleTodoApp = (idTodo: string, title: string) => {
        dispatchTodoLists(updateTitleTodoListAC(idTodo, title))
    }
    const removeTodoApp = (idTodo: string) => {
        dispatchTodoLists(removeTodoListAC(idTodo))
        dispatchTasks(removeTodoListAC(idTodo))
    }
    const addTodo = (newTitle: string) => {
        //we must form similar object
        let action = addTodoListAC(newTitle)
        //and now we have one object which we sent to the useReducer
        dispatchTodoLists(action)
        dispatchTasks(action)
    }
    return (
        <div className={cl.App}>
            <AppStyled/>
            <div className={cl.AppWrapper}><AddItemForm addTaskApp={addTodo}/>
                {todoLists.map(el => {
                    return (
                        <TodoList
                            changeFilterTodo={changeFilterTodo}
                            key={el.id}
                            idTodo={el.id}
                            title={el.title}
                            filter={el.filter}
                            tasks={tasks[el.id]}
                            deleteTaskApp={deleteTaskApp}
                            addTaskApp={addTaskApp}
                            changeStatusTask={changeStatusTask}
                            removeTodo={removeTodoApp}
                            updateTitleTodo={updateTitleTodoApp}
                            updateTitleTaskApp={updateTitleTaskApp}
                        />
                    )
                })}</div>
        </div>
    );
}

export default App;
