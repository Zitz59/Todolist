import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from '@material-ui/core';
import EditableSpan from './components/EditableSpan';
import {Delete} from '@material-ui/icons';
import {TaskType} from './Todolist';


type TaskPropsType = {
    task: TaskType
    removeTask: (taskID: string, todolistId: string) => void
    changeTaskStatus: (taskID: string, status: boolean, todolistId: string) => void
    changeTaskTitle: (taskID: string, title: string, todolistId: string) => void
    todolistId: string
}


export const Task = React.memo(({task, removeTask, changeTaskStatus, changeTaskTitle, todolistId}: TaskPropsType) => {

    const onClickHandler = useCallback(() => removeTask(task.id, todolistId), [task.id, removeTask, todolistId])
    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        changeTaskStatus(task.id, newIsDoneValue, todolistId);
    }, [task.id, changeTaskStatus, todolistId])
    const onTitleChangeHAndler = useCallback((newValue: string) => {
            changeTaskTitle(task.id, newValue, todolistId)
        },
        [task.id, changeTaskTitle, todolistId])


    return (
        <div key={task.id} className={task.isDone ? 'is-done' : ''}>
            <Checkbox defaultChecked onChange={onChangeHandler} checked={task.isDone}/>
            <EditableSpan title={task.title} callBack={(newTitle) => onTitleChangeHAndler}/>
            <IconButton aria-label={'delete'} onClick={onClickHandler}><Delete/></IconButton>
        </div>
    )
})