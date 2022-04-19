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

    function changeTaskStatus(taskID: string, isDone: boolean) {
        const updatedTask = tasks.map(t => t.id === taskID ? {...t, isDone: isDone} : t)
        setTasks(updatedTask)
    }//tasks mapping=>if task.id === id => {old tasks massive + new task with isDone(status)}
    //we create new object copy with changes and set it to  old tasks massive(setTasks)

//=======================================================================
    //UI:

    return (
        <div className="App">
            <TodoList // Todolist function call with other functions({})
                filter={filter}
                title={todoListTitle}
                tasks={tasks}

                addTask={addTask}
                removeTask={removeTask}
                changeFilter={changeFilter}
                changeTaskStatus={changeTaskStatus}

            />
        </div>
    );

}


export default App;
