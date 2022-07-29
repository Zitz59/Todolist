
import {AddTodolistACType, RemoveTodolistACType, SetTodoListType} from './todolists-reducer';
import {TaskStatuses, TaskType, todolistsApi} from '../api/todolists-api';
import {TasksStateType} from '../AppWithRedux';
import {AnyAction, Dispatch} from 'redux';

export type RemoveTaskType = ReturnType<typeof removeTaskAC>

export type AddTaskType = ReturnType<typeof addTaskAC>

export type ChangeTaskStatusType = ReturnType<typeof changeTaskStatusAC>

export type ChangeTaskTitleType = ReturnType<typeof changeTaskTitleAC>

export type SetTasksType = ReturnType<typeof setTasksAC>

let initialState: TasksStateType = {}

type ActionsType = RemoveTaskType
    | AddTaskType
    | ChangeTaskStatusType
    | ChangeTaskTitleType
    | AddTodolistACType //from todolist-reducer
    | RemoveTodolistACType //from todolist-reducer
    | SetTodoListType //from todolist-reducer
    | SetTasksType

export const tasksReducer = (state = initialState, action: ActionsType): TasksStateType => {

    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const newTask = action.task
            const tasks = stateCopy[action.task.todoListId];
            stateCopy[action.task.todoListId] = [newTask, ...tasks];
            return stateCopy
        }
        // return {
        //     ...state,
        //     [action.todolistId]: [{id: v1(), title: action.title, status: TaskStatuses.New,addedDate:'',priority:TaskPriorities.Low,order:0}, ...state[action.todolistId]]
        // }

        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    status: action.status
                } : t)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    title: action.title
                } : t)
            }

        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.payload.todolistId]: []
            }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state}
            delete copyState[action.payload.todolistId1]
            return copyState
            // const {[action.payload.todolistId1]:[],...rest}={...state}
            // return rest

        }
        case 'SET-TODOLISTS': {
            const copyState = {...state}
            action.todolists.forEach(tl => {
                copyState[tl.id] = [];
            })
            return copyState
        }
        case 'SET-TASKS': {
            const copyState = {...state}
            copyState[action.todolistId] = action.tasks
            return copyState
        }

        // action.todolists.forEach(tl=>{...state[tl.id]=[]})


        default:
            return state

    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: 'REMOVE-TASK', taskId, todolistId} as const
}

export const addTaskAC = (task:TaskType) => {
    return {type: 'ADD-TASK', task} as const
}

export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string) => {
    return {type: 'CHANGE-TASK-STATUS', taskId, status, todolistId} as const
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {type: 'CHANGE-TASK-TITLE', taskId, title, todolistId} as const
}

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => {
    return {type: 'SET-TASKS', tasks, todolistId} as const
}

export const fetchTasks = (todolistId:string) => {
    return (dispatch: Dispatch) => {
        todolistsApi.getTasks(todolistId)
            .then((res) => {
                dispatch(setTasksAC(res.data.items,todolistId))
            })
    }
}
export const deleteTask = (taskId:string,todolistId:string) => {
    return (dispatch:Dispatch<AnyAction>) => {
        todolistsApi.deleteTask(todolistId,taskId)
            .then((res)=>{
                dispatch(removeTaskAC(taskId,todolistId))
            })
    }
}
export const addTaskTC = (title:string,todolistId:string) => {
    return (dispatch:Dispatch) => {
        todolistsApi.createTask(todolistId,title)
            .then((res)=>{
                dispatch(addTaskAC(res.data.data.item))
            })
    }
}