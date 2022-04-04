import React from 'react';
import {FilterValuesType} from "./App";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: number) => void
    changeFilter:(filter:FilterValuesType) =>void

}


export const TodoList = (props: PropsType) => {

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
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    {tasksListItems}
                </ul>
                <div>
                    <button onClick={()=> props.changeFilter("all")}>All</button>
                    <button onClick={()=> props.changeFilter("active")}>Active</button>
                    <button onClick={()=> props.changeFilter("completed")}>Completed</button>
                </div>
            </div>
        </div>
    );
};

export default TodoList;