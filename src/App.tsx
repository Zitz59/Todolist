import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from './Todolist';
import {v1} from 'uuid';
//C - Create
//R - Read
//U - Update
//D - Delete
export type FilterValuesType = 'all' | 'active' | 'completed'


function App() {

    //BLL:
    const todoListTitle: string = 'What to learn'

    const [tasks, setTasks] = useState<Array<TaskType>>([ //state,setState
        {id: v1(), title: 'HTML & CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false}
    ])

    const removeTask = (taskID: string) => {
        setTasks(tasks.filter(t => t.id !== taskID))
    }

    const addTask = (title: string) => {//функция для создания новой таски
        console.log('before')
        const newTask: TaskType = {
            id: v1(),
            title,
            isDone: false
        }
        console.log('new', newTask)
        setTasks([newTask, ...tasks])
    }


    const [filter, setFilter] = useState<FilterValuesType>('all')
    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
        console.log(filter)
    }


    /* let tasks: TaskType[] =  [
         {id: 1, title: "HTML & CSS", isDone: true},
         {id: 2, title: "JS", isDone: true},
         {id: 3, title: "ReactJS", isDone: false}
     ]
 */
//=======================================================================
    //UI:
    let tasksForRender;
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
    console.log(tasksForRender)
    return (
        <div className="App">
            <TodoList
                title={todoListTitle}
                tasks={tasksForRender}
                addTask={addTask}
                removeTask={removeTask}
                changeFilter={changeFilter}

            />
        </div>
    );

}


export default App;
