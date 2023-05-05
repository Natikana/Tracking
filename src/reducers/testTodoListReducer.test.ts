import {TodoListsType} from "../App";
import {changeFilterTodoListAC, removeTodoListAC, todoListReducer, updateTitleTodoListAC} from "./todoListReducer";
import {FilterType} from "../components/todoList/TodoList";

let startState:Array<TodoListsType>

beforeEach(()=>{
    startState = [
        {id: '1', title: 'What to learn', filter: FilterType.all},
        {id: '2', title: 'What to buy', filter: FilterType.all},
    ]
})

test('should be change filter of todoList',() => {
    const endState = todoListReducer(startState,changeFilterTodoListAC('2',FilterType.completed))
    expect(endState[1].filter).toBe('Completed')
})
test('should be update title of todoList',() => {
    const endState = todoListReducer(startState, updateTitleTodoListAC('1', 'yes I did'))
    expect(endState[0].title).toBe('yes I did')
})
test('should be remove todoList', () => {
    const endState = todoListReducer(startState, removeTodoListAC('2'))
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe('1')
    expect(endState[1]).not.toBeDefined()

})