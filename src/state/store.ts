import {TaskActionsType, tasksReducer} from './task-reducer';
import {TodolistReducerType, todolistsReducer} from './todolists-reducer';
import {AnyAction, applyMiddleware, combineReducers, compose, legacy_createStore} from 'redux';
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // непосредственно создаём store export const store = legacy_createStore(rootReducer, composeEnhancers());

// непосредственно создаём store
export const store = legacy_createStore(rootReducer,applyMiddleware(thunkMiddleware),);
// определить автоматически тип всего объекта состояния

type AppActionsType = TodolistReducerType | TaskActionsType

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;

