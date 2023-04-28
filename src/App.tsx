import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./components/TodoList";
import {v1} from "uuid";

export type TaskTypeProps = {
    id: string
    title: string
    isDone: boolean
}

function App() {
    const [tasks, setTasks] = useState<TaskTypeProps[]>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false}
    ])

    const deleteTaskApp = (idTask: string) => {
        setTasks(tasks.filter(el => el.id !== idTask))
    }
    const addTaskApp = (newTitle: string) => {
        let newTask = {id: v1(), title: newTitle, isDone: false}
        setTasks([newTask, ...tasks])
    }
    const changeStatusTask = (check:boolean, idTask: string) => {
      setTasks(tasks.map(el => el.id === idTask ? {...el,isDone:check} : el))
    }

    return (
        <div className="App">
            <TodoList
                tasks={tasks}
                title={'Hi, React'}
                deleteTaskApp={deleteTaskApp}
                addTaskApp={addTaskApp}
                changeStatusTask={changeStatusTask}
            />
        </div>
    );
}

export default App;
