import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './components/AddItemForm';
import EditableSpan from './components/EditableSpan';
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';

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

export function Todolist(props: PropsType) {

    const removeTodolist = () => props.removeTodolist(props.id)
    const onAllClickHandler = () => props.changeFilter('all', props.id);
    const onActiveClickHandler = () => props.changeFilter('active', props.id);
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id);
    const addTaskHandler = (newTitle: string) => {
        props.addTask(newTitle, props.id)
    }
    const editTodolistHandler = (newTitle: string) => {
        props.editTodolist(props.id, newTitle)
    }

    const editTaskHandler = (tID: string, newTitle: string) => {
        props.editTask(props.id, tID, newTitle)

    }

    return <div>
        <h3>
            <EditableSpan title={props.title} callBack={editTodolistHandler}/>
            <IconButton onClick={removeTodolist}><Delete/></IconButton>
        </h3>
        <AddItemForm callBack={addTaskHandler}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }

                    return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <Checkbox color={'primary'} onChange={onChangeHandler} checked={t.isDone}/>
                        {/*<span>{t.title}</span>*/}
                        <EditableSpan title={t.title} callBack={(newTitle) => editTaskHandler(t.id, newTitle)}/>
                        <IconButton aria-label={'delete'} onClick={onClickHandler}><Delete/></IconButton>
                    </li>
                })
            }
        </ul>
        <div>
            <Button className={props.filter === 'all' ? 'active-filter' : ''}
                    onClick={onAllClickHandler}
                    color={'default'}
                    variant={'contained'}>All
            </Button>
            <Button className={props.filter === 'active' ? 'active-filter' : ''}
                    onClick={onActiveClickHandler}
                    color={'primary'}
            variant={'outlined'}>Active
            </Button>
            <Button className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}
                    variant={'outlined'}>Completed
            </Button>
        </div>
    </div>
}


