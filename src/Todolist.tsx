import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType} from './App';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    addTask: (title: string) => void
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValuesType) => void


}

export const TodoList = (props: PropsType) => {
    const [title, setTitle] = useState<string>('');

    const onClickAddTask = () => {
        console.log('add', title)
        const trimmedTitle = title.trim()
        console.log(trimmedTitle)
        if (trimmedTitle) {
            console.log('if', trimmedTitle, props.addTask)
            props.addTask(trimmedTitle)
            setTitle('')
        }
    }

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickAddTask()
        }
    }
    const onAllClickHandler = () => props.changeFilter('all')
    const onActiveClickHandler = () => props.changeFilter('active')
    const onCompletedClickHandler = () => props.changeFilter('completed')
    const tasksListItems = props.tasks.map(t => { //t => {id:1, title:"HTML", isDone:true}
        const removeTask = () => props.removeTask(t.id)
        return (
            <li key={t.id}><input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={removeTask}>del</button>
            </li>

        )
    })
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onNewTitleChangeHandler}
                    onKeyPress={onKeyPressHandler}/>
                <button onClick={onClickAddTask}>+</button>
            </div>
            <ul>
                {tasksListItems}
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>

    );
}
