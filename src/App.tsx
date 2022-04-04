import React, {useState} from 'react';
import './App.css';
import {TaskType,TodoList} from "./Todolist";
//C - Create
//R - Read
//U - Update
//D - Delete
export type FilterValuesType = "all" | "active" |"completed"


function App() {
    //BLL:
    const todoListTitle: string = 'What to learn'
    const[tasks,setTasks] = useState<Array<TaskType>>([ //state,setState
        {id: 1, title: "HTML & CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false}
    ])

    const removeTask = (taskID:number) => {
        setTasks(tasks.filter(t => t.id != taskID))
    }


    const [filter,setFilter] = useState<FilterValuesType> ("all")
    const changeFilter = (filter:FilterValuesType) => {
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
    switch (filter){
        case "completed":
            tasksForRender = tasks.filter(t => t.isDone === true)
            break
        case "active":
            tasksForRender = tasks.filter(t => t.isDone === false)
            break
        default:
            tasksForRender = tasks
    }

    return (
        <div className="App">
            <TodoList
                title={todoListTitle}
                tasks={tasksForRender}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
