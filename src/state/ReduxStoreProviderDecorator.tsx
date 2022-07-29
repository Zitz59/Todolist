import React from 'react';
import {Provider} from 'react-redux';
import {combineReducers, legacy_createStore} from 'redux'
import {todolistsReducer} from '../state/todolists-reducer'
import {v1} from 'uuid'
import {AppRootStateType} from '../state/store'
import {tasksReducer} from './task-reducer';
import {TaskPriorities, TaskStatuses} from '../api/todolists-api';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0}
    ],
    tasks: {
        ['todolistId1']: [
            {
                id: v1(),
                title: 'HTML&CSS',
                status: TaskStatuses.Completed,
                addedDate: '31231',
                order: 0,
                deadline: '',
                startDate: '4ade80',
                completed: false,
                priority: TaskPriorities.Low,
                todoListId: 'todoListId1',
                description: ''
            },
            {
                id: v1(),
                title: 'JS',
                status: TaskStatuses.Completed,
                addedDate: '31231',
                order: 0,
                deadline: '',
                startDate: '4ade80',
                completed: false,
                priority: TaskPriorities.Low,
                todoListId: 'todoListId1',
                description: ''
            }
        ],
        ['todolistId2']: [
            {
                id: v1(),
                title: 'Milk',
                status: TaskStatuses.Completed,
                addedDate: '31231',
                order: 0,
                deadline: '',
                startDate: '',
                completed: false,
                priority: TaskPriorities.Low,
                todoListId: 'todoListId2',
                description: ''
            },
            {
                id: v1(),
                title: 'React Book',
                status: TaskStatuses.Completed,
                addedDate: '31231',
                order: 0,
                deadline: '',
                startDate: '',
                completed: false,
                priority: TaskPriorities.Low,
                todoListId: 'todoListId2',
                description: ''
            }
        ]
    }
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType);

export const ReduxStoreProviderDecorator = (storyFn: () => JSX.Element) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}