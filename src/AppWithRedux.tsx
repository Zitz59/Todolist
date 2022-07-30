import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from './components/AddItemForm';
import ButtonAppBar from './components/ButtonAppBar';
import {Container, Grid, Paper} from '@material-ui/core';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, fetchTodoLists, FilterValuesType,
    removeTodolistAC, TodolistDomainType,
} from './state/todolists-reducer';
import {
    addTaskTC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    deleteTask,
} from './state/task-reducer';
import {useSelector} from 'react-redux';
import {RootState} from './state/store';
import {TaskStatuses, TaskType} from './api/todolists-api';

import {useAppDispatch} from './state/hooks';

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    let todolists = useSelector<RootState, Array<TodolistDomainType>>(state => state.todolists)

    let tasks = useSelector<RootState, TasksStateType>(state => state.tasks)

    let dispatch = useAppDispatch()

    const editTodolist = useCallback((todolistId: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(todolistId, newTitle))
    },[dispatch])

    const addTodolist = useCallback((newTitle: string) => {
        let action = addTodolistAC(newTitle)
        dispatch(action)
    }, [dispatch])

    const editTask = useCallback((todolistId: string, taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskId, newTitle))
    }, [dispatch])

    const removeTask = useCallback((id: string, todolistId: string) => {
        const thunk = deleteTask(id,todolistId)
        dispatch(thunk)
    }, [dispatch])

    const addTask = useCallback((title: string, todolistId: string) => {
        const thunk  = addTaskTC(title, todolistId)
        dispatch(thunk)
    }, [dispatch])

    const changeStatus = useCallback((id: string, status: TaskStatuses, todolistId: string) => {
        dispatch(changeTaskStatusAC(id, status, todolistId))
    }, [dispatch])

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(todolistId, value))
    }, [dispatch])

    const removeTodolist = useCallback((id: string) => {
        let action = removeTodolistAC(id)
        dispatch(action)
    }, [dispatch])

    useEffect(()=>{
        dispatch(fetchTodoLists())
    },[])

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm callBack={addTodolist}/>

                </Grid>
                <Grid container spacing={3}>{
                    todolists.map(tl => {
                        let allTodolistTasks = tasks[tl.id];
                        return <Grid item>
                            <Paper style={{padding: '10px'}}>
                                <Todolist
                                key={tl.id}
                                id={tl.id}
                                title={tl.title}
                                tasks={allTodolistTasks}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeTaskStatus={changeStatus}
                                filter={tl.filter}
                                removeTodolist={removeTodolist}
                                editTodolist={editTodolist}
                                editTask={editTask}
                            /></Paper>
                        </Grid>
                    })
                }</Grid>

            </Container>

        </div>
    );
}

export default AppWithRedux;


