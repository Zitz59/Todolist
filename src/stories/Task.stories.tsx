import React, {useState} from 'react';
import {action} from '@storybook/addon-actions';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Task} from '../Task';
import {TaskPriorities, TaskStatuses} from '../api/todolists-api';


export default {
    title: 'Todolist/Task',
    component: Task,
    args: {
        // changeTaskStatus: action('changeTaskStatus'),
        // changeTaskTitle: action('changeTaskTitle'),
        // removeTask:action('removeTask')
    }
} as ComponentMeta<typeof Task>

const Template: ComponentStory<typeof Task> = (args) => {

    const [task, setTask] = useState({id: '1', status: TaskStatuses.New, title: 'HTML',addedDate:'',order:0,deadline:'',startDate:'',completed:false,priority:TaskPriorities.Low,todoListId:'1',description:""})

    const changeTaskStatus = () => setTask({id: '1', status: task.status, title: 'HTML',addedDate:'',order:0,deadline:'',startDate:'',completed:false,priority:TaskPriorities.Low,todoListId:'1',description:""})

    const changeTaskTitle = (taskId: string, newValue: string) => setTask({
        id: taskId, status: task.status, title: newValue,addedDate:'',order:0,deadline:'',startDate:'',completed:false,priority:TaskPriorities.Low,todoListId:'1',description:""
    })

    return <Task task={task} removeTask={action('removeTask')} changeTaskStatus={changeTaskStatus}
                 changeTaskTitle={changeTaskTitle} todolistId={'14aad'}/>
}

export const TaskStory = Template.bind({});
TaskStory.args = {}

// export const TaskIsDoneExample = Template.bind({});
// TaskIsDoneExample.args = {
//     task: {id: '1', status: TaskStatuses.Completed, title: 'JS'},
//     todolistId: 'todolistId1'
// }
//
// export const TaskIsNotDoneExample = Template.bind({});
// TaskIsNotDoneExample.args = {
//   task: {id: '1', status: TaskStatuses.New, title: 'HTML'},
//   todolistId: 'todolistId1'
// }
