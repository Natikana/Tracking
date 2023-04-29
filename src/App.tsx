import React, {useState} from 'react';
import './App.css';
import {FilterType, TodoList} from "./components/TodoList";
import {v1} from "uuid";

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

    const [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        {id: todoListID1, title: 'What to learn', filter: 'All'},
        {id: todoListID2, title: 'What to buy', filter: 'All'},
    ])

    const [tasks, setTasks] = useState<TasksType>({
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
        //setTasks(tasks.filter(el => el.id !== idTask))
        setTasks({...tasks, [idTodo]: tasks[idTodo].filter(el => el.id !== idTask)})
    }
    const addTaskApp = (idTodo: string, newTitle: string) => {
        let newTask = {id: v1(), title: newTitle, isDone: false}
        setTasks({...tasks, [idTodo]: [newTask, ...tasks[idTodo]]})
        //setTasks([newTask, ...tasks])
    }
    const changeStatusTask = (idTodo: string, idTask: string, check: boolean) => {
        setTasks({...tasks, [idTodo]: tasks[idTodo].map(el => el.id === idTask ? {...el, isDone: check} : el)})
        //setTasks(tasks.map(el => el.id === idTask ? {...el, isDone: check} : el))
    }
    const changeFilterTodo = (idTodo: string, filter: FilterType) => {
        setTodoLists(todoLists.map(el => el.id === idTodo ? {...el, filter} : el))
    }
    const removeTodoApp = (idTodo: string) => {
        setTodoLists(todoLists.filter(el => el.id !== idTodo))
    }
    return (
        <div className="App">
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
                    />
                )
            })}
        </div>
    );
}

export default App;
