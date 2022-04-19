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
    filter: FilterValuesType
    addTask: (title: string) => void
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    changeTaskStatus: (id: string, isDone: boolean) => void


}

export const TodoList = (props: PropsType) => {
    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const onClickAddTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle)
        } else {
            setError(true)
        }

        setTitle('')
    }

    const allBtnClasses = props.filter === 'all' ? 'activeFilter' : ' ';//active button checking
    const activeBtnClasses = props.filter === 'active' ? 'activeFilter' : ' ';//active button checking
    const completedBtnClasses = props.filter === 'completed' ? 'activeFilter' : ' ';//active button checking
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        if(error)setError(false)//hide error after start typing
    }//
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickAddTask()
        }
    }//Send message 'Enter Button'
    const getTasksForRender = (tasks: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {
        let tasksForRender; //function for filter tasks
        switch (filter) {
            case 'completed':
                tasksForRender = tasks.filter(t => t.isDone)
                break
            case 'active':
                tasksForRender = tasks.filter(t => !t.isDone)
                break
            default:
                tasksForRender = tasks
        }
        return tasksForRender
    }//Чистая функция
    const tasksForRender: Array<TaskType> = getTasksForRender(props.tasks, props.filter)//start getTasksForRender function
    const onAllClickHandler = () => props.changeFilter('all')
    const onActiveClickHandler = () => props.changeFilter('active')
    const onCompletedClickHandler = () => props.changeFilter('completed')
    const inputClasses = error ? 'error' : ''

    const tasksListItems = tasksForRender.length // if tasksForRender !== 0 (true)
        ? tasksForRender.map(t => { //t => {id:1, title:"HTML", isDone:true}
            const removeTask = () => props.removeTask(t.id)
            const onChangeChangeStatus = (e: ChangeEvent<HTMLInputElement>) =>
                props.changeTaskStatus(t.id, e.currentTarget.checked)
            const isDoneTaskClasses = t.isDone ? 'isDone' : ' '

            return (
                <li key={t.id}>
                    <input type="checkbox"
                           checked={t.isDone}
                           onChange={onChangeChangeStatus}
                    />
                    <span className={isDoneTaskClasses}>{t.title}</span>
                    <button onClick={removeTask}>del</button>

                </li>
            )
        }) //=> we render map of tasks
        : <span> No tasks in list</span> //if tasksForRender ==0 (false)  => we render error span
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onNewTitleChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    className={inputClasses}
                />
                <button onClick={onClickAddTask}>+</button>
                {error && <div className={'errorMessage'}>Title is required</div>}
            </div>
            <ul>
                {tasksListItems}
            </ul>
            <div>
                <button className={allBtnClasses} onClick={onAllClickHandler}>All</button>
                <button className={activeBtnClasses}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={completedBtnClasses}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>

    );
}
