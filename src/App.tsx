import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodoListsType = {
    id:string,
    title:string,
    filter:FilterValuesType
}

function App() {

    let todolistID1 =v1();
    let todolistID2 =v1();

    let [todolists,setTodolists] = useState<Array<TodoListsType>>([
        {id:todolistID1,title:'What to learn',filter:'all'},
        {id:todolistID2,title:'What to buy',filter:'all'},
    ])

    let [tasks,setTasks] = useState({
        [todolistID1]:[
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todolistID2]:[
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    });
    console.log(tasks[todolistID2])
    function removeTask(todolistID:string, taskID: string) {
        setTasks({...tasks,[todolistID]:tasks[todolistID].filter(el=>el.id!==taskID)} )
    }
    function addTask(todolistID:string,title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks,[todolistID]:[newTask,...tasks[todolistID]]})
    }
    function changeStatus(todolistID:string,taskId: string, isDone: boolean) {
        setTasks({...tasks,[todolistID]:tasks[todolistID].map(el=>el.id===taskId?{...el,isDone:isDone}:el)})}
    function changeFilter(todolistID: string, value: FilterValuesType) {
        setTodolists(todolists.map(tl=>tl.id===todolistID? {...tl,filter:value} : tl))
    }
    const removeTodoLIst = (todolistID:string) => {
        setTodolists(todolists.filter(el=>el.id!==todolistID))
        delete tasks[todolistID]
        console.log(tasks)
    }

    return (
        <div className="App">
            {
                todolists.map((tl) => {

                    let tasksForTodolist = tasks[tl.id];
                    if (tl.filter === 'active') {
                        tasksForTodolist = tasks[tl.id].filter(t => t.isDone === false);
                    }
                    if (tl.filter === 'completed') {
                        tasksForTodolist = tasks[tl.id].filter(t => t.isDone === true);
                    }

                    return <Todolist
                        key={tl.id}
                        todolistID={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        removeTodoLIst={removeTodoLIst}
                    />
                })
            }

        </div>
    );
}

export default App;
