import {TasksStateType} from '../App';

export type RemoveTaskType = {
    type:'REMOVE-TASK'
    taskId:string
    todolistId:string
}

export type AddTaskType = {
    type:'ADD-TASK'
    taskId:string
    todolistId:string
}






type ActionsType = RemoveTaskType
    | AddTaskType

export const taskReducer = (state:TasksStateType,action:ActionsType):TasksStateType=>{
    switch (action.type){
        case 'REMOVE-TASK':
            return {...state,
                [action.todolistId]: state[action.todolistId].filter(t=>t.id !== action.taskId)}
        case 'ADD-TASK':
            return {...state}
        default:
            return state

    }
}

export const removeTaskAC = (taskId:string,todolistId:string)=>{
    return{type:'REMOVE-TASK',taskId,todolistId} as const
}