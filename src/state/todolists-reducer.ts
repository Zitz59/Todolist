import {FilterValuesType, TodolistType} from '../App';
import {v1} from 'uuid';

export type AddTodolistACType = ReturnType<typeof addTodolistAC>

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>

export type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>

export type changeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>

let initialState: Array<TodolistType> = []


type TodolistReducerType =
    AddTodolistACType
    | RemoveTodolistACType
    | changeTodolistTitleACType
    | changeTodolistFilterACType

export const todolistsReducer = (state = initialState, action: TodolistReducerType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.todolistId1)
        }
        case 'ADD-TODOLIST': {
            // let newTodolistId = v1();
            // let newTodolist: TodolistType = {id: newTodolistId, title: action.payload.newTodolistTitle, filter: 'all'};
            // return [...state, newTodolist]
            return [...state, {id: action.payload.todolistId, title: action.payload.newTodolistTitle, filter: 'all'}]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(el => el.id === action.payload.todolistId2 ? {
                ...el,
                title: action.payload.newTodolistTitle
            } : el)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(el => el.id === action.payload.todolistId2 ? {
                ...el,
                filter: action.payload.newFilter
            } : el)
        }
        default:
            return state
    }
}

export const removeTodolistAC = (todolistId1: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {todolistId1}
    } as const

}

export const addTodolistAC = (newTodolistTitle: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {newTodolistTitle, todolistId: v1()}
    } as const
}

export const changeTodolistTitleAC = (todolistId2: string, newTodolistTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {todolistId2, newTodolistTitle}
    } as const
}

export const changeTodolistFilterAC = (todolistId2: string, newFilter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {todolistId2, newFilter}
    } as const
}