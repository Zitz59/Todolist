import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm';
import ButtonAppBar from './components/ButtonAppBar';
import {Container, Grid, Paper} from '@material-ui/core';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from './state/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/task-reducer';

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithReducer() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'React Book', isDone: true}
        ]
    });

    const editTodolist = (todolistId: string, newTitle: string) => {
        dispatchToTodolists(changeTodolistTitleAC(todolistId, newTitle))
    }

    const addTodolist = (newTitle: string) => {
        let action = addTodolistAC(newTitle)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

    const editTask = (todolistId: string, taskId: string, newTitle: string) => {
        dispatchToTasks(changeTaskTitleAC(todolistId, taskId, newTitle))
    }

    function removeTask(id: string, todolistId: string) {
        dispatchToTasks(removeTaskAC(id, todolistId))
    }

    function addTask(title: string, todolistId: string) {
        dispatchToTasks(addTaskAC(title, todolistId))
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        dispatchToTasks(changeTaskStatusAC(id, isDone, todolistId))
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatchToTodolists(changeTodolistFilterAC(todolistId, value))
    }

    function removeTodolist(id: string) {
        let action = removeTodolistAC(id)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

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
                        let tasksForTodolist = allTodolistTasks;

                        if (tl.filter === 'active') {
                            tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
                        }
                        if (tl.filter === 'completed') {
                            tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
                        }

                        return <Grid item>
                            <Paper style={{padding: '10px'}}><Todolist
                                key={tl.id}
                                id={tl.id}
                                title={tl.title}
                                tasks={tasksForTodolist}
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

export default AppWithReducer;


