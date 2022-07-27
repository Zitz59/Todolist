import React, {useState} from 'react';
import {action} from '@storybook/addon-actions';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Task} from '../Task';


export default {
    title: 'Todolist/Task',
    component: Task,
    args:{
        // changeTaskStatus: action('changeTaskStatus'),
        // changeTaskTitle: action('changeTaskTitle'),
        // removeTask:action('removeTask')
    }
} as ComponentMeta<typeof Task>

const Template: ComponentStory<typeof Task> = (args) => {

    const [task, setTask] = useState({id: '1', isDone: false, title: 'HTML'})

    const changeTaskStatus = () => setTask({id: '1', isDone: !task.isDone, title: 'HTML'})

    const changeTaskTitle = (taskId:string,newValue: string) => setTask({
        id: taskId, isDone: task.isDone, title: newValue
    })

    return <Task task={task} removeTask={action('removeTask')} changeTaskStatus={changeTaskStatus}
                 changeTaskTitle={changeTaskTitle} todolistId={'14aad'}/>
}

export const TaskStory = Template.bind({});
TaskStory.args = {}

// export const TaskIsDoneExample = Template.bind({});
// TaskIsDoneExample.args = {
//     task: {id: '1', isDone: true, title: 'JS'},
//     todolistId: 'todolistId1'
// }
//
// export const TaskIsNotDoneExample = Template.bind({});
// TaskIsNotDoneExample.args = {
//   task: {id: '1', isDone: false, title: 'HTML'},
//   todolistId: 'todolistId1'
// }
