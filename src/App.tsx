import React from 'react';
import './App.css';
import Todolist from "./Todolist";

function App() {

    const tasks1 = [
        {id:1 , title:"HTML & CSS", isDone:true},
        {id:2 , title:"JS", isDone:true},
        {id:3 , title:"ReactJS", isDone:false}]

    const tasks2 = [
        {id:1 , title:"Math", isDone:true},
        {id:2 , title:"Literature", isDone:false},
        {id:3 , title:"Athletics", isDone:true}]



    return (
        <div className="App">
            <Todolist title ="What to learn" tasks={tasks1}/>
            <Todolist title ="Subjects"  tasks={tasks2}/>
        </div>
    );
}

export default App;
