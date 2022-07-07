import React, {ChangeEvent, memo, useCallback} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './components/AddItemForm';
import EditableSpan from './components/EditableSpan';
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {Task} from './Task';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    editTodolist: (id: string, newTitle: string) => void
    // editTodolistHandler:()=>void
    editTask: (id: string, tID: string, newTitle: string) => void
}

export const Todolist = React.memo((props: PropsType) => {

    const addTask = useCallback((newTitle: string) => {
        props.addTask(newTitle, props.id)
    }, [props.id, props.addTask])

    const removeTodolist = () => props.removeTodolist(props.id)

    const onAllClickHandler = useCallback(() => props.changeFilter('all', props.id), [props.changeFilter, props.id]);
    const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.id), [props.changeFilter, props.id]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.id), [props.changeFilter, props.id]);

    let tasksForTodolist = props.tasks;

    if (props.filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
    }
    if (props.filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
    }

    const editTodolistHandler = useCallback((newTitle: string) => {
        props.editTodolist(props.id, newTitle)
    }, [props.editTodolist, props.id])
    const editTaskHandler = (tID: string, newTitle: string) => {
        props.editTask(props.id, tID, newTitle)

    }

    return <div>
        <h3>
            <EditableSpan title={props.title} callBack={editTodolistHandler}/>
            <IconButton onClick={removeTodolist}><Delete/></IconButton>
        </h3>
        <AddItemForm callBack={addTask}/>
        <div>
            {
                tasksForTodolist.map(t => <Task key={t.id} task={t} removeTask={props.removeTask}
                                                changeTaskStatus={props.changeTaskStatus}
                                                changeTaskTitle={props.editTask} todolistId={props.id}/>)}
        </div>
        <div>
            <Button variant={props.filter === 'all' ? 'outlined' : 'contained'}
                    onClick={onAllClickHandler}
                    style={{backgroundColor: '#FFC0CB'}}
            >All
            </Button>
            <Button variant={props.filter === 'active' ? 'outlined' : 'contained'}
                    onClick={onActiveClickHandler}
                    style={{backgroundColor: '#FFD4C0'}}
            >Active
            </Button>
            <Button
                onClick={onCompletedClickHandler}
                variant={props.filter === 'completed' ? 'outlined' : 'contained'}>Completed
            </Button>
        </div>
    </div>
})

const FilterComponent = (props: FilterValuesType) => {
}
