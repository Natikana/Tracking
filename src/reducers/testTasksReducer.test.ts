import {TasksType} from "../App";
import {addTaskAC, changeTaskStatusAC, deleteTaskAC, tasksReducer, updateTaskTitleAC} from "./tasksReducer";
import {addTodoListAC, removeTodoListAC} from "./todoListReducer";

let startTasks:TasksType
let todoListID1:string
let todoListID2:string

beforeEach(()=> {
    todoListID1= 'id1'
    todoListID2= 'id2'

    startTasks = {
        [todoListID1]: [
        {id: '1', title: 'HTML&CSS', isDone: true},
        {id: '2', title: 'JS', isDone: true},
        {id: '3', title: 'ReactJS', isDone: false},
        {id: '4', title: 'ReactJS', isDone: false},

    ],
        [todoListID2]: [
        {id: '5', title: 'Rest API', isDone: true},
        {id: '6', title: 'GraphQL', isDone: false},
    ]
    }
})

test('should be remove task',() => {

    const endTasks = tasksReducer(startTasks,deleteTaskAC(todoListID2,'5'))
    expect(endTasks[todoListID1].length).toBe(4)
    expect(endTasks[todoListID2].length).toBe(1)
    expect(endTasks[todoListID2][0].title).toBe('GraphQL')
})

test('should be add task',()=> {
    const endState = tasksReducer(startTasks,addTaskAC(todoListID1,'hello'))
    expect(endState[todoListID1][0].title).toBe('hello')
    expect(endState[todoListID2][0].title).toBe('Rest API')
})

test('should be change status of task',()=>{
    const endState = tasksReducer(startTasks,changeTaskStatusAC(todoListID2,'6',true))
    expect(endState[todoListID2][1].isDone).toBe(true)
})
test('should be update title of task',()=>{
    const endState = tasksReducer(startTasks, updateTaskTitleAC(todoListID1,'2','yo'))
    expect(endState[todoListID1][1].title).toBe('yo')
})
test('should be remove empty array',() => {
    const endState = tasksReducer(startTasks,removeTodoListAC(todoListID1))
    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState[todoListID2][0].id).toBe('5')
    expect(endState[todoListID1]).not.toBeDefined()
})
test('should be add new empty array',() => {

    const endState = tasksReducer(startTasks,addTodoListAC('victory'))
    const keys = Object.keys(endState)
    const newTodoId = keys.find(el => el != todoListID1 && el != todoListID2)
    if(!newTodoId) {
        throw Error
    }

    expect(keys.length).toBe(3)
    expect(endState[newTodoId]).toEqual([])
})

