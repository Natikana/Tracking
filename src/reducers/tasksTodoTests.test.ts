import {TasksType, TodoListsType} from "../App";
import {addTodoListAC, todoListReducer} from "./todoListReducer";
import {tasksReducer} from "./tasksReducer";

test('should be add todoList and empty array to the tasks',() => {
    let todoLists:TodoListsType[] = []
    let tasks:TasksType = {}

    const action = addTodoListAC('hi')
    const endTodoLists = todoListReducer(todoLists,action)
    const endTasks = tasksReducer(tasks,action)

    const keysTasks = Object.keys(endTasks)
    const idTodoFromTasks = keysTasks[0]
    const idTodoFromTodo = endTodoLists[0].id

    expect(idTodoFromTasks).toBe(action.idTodo)
    expect(idTodoFromTodo).toBe(action.idTodo)
})
