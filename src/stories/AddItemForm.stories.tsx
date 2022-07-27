import React from 'react';
import {AddItemForm} from '../components/AddItemForm';
import {action} from '@storybook/addon-actions';
import {ComponentMeta, ComponentStory} from '@storybook/react';

export default {
  title: 'Todolist/AddItemForm',
  component:AddItemForm,
  argTypes:{
    callBack:{
      description:'Button inside form clicked'
    }
  }
} as ComponentMeta<typeof AddItemForm>

const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args}/>

export const AddItemFormStory = Template.bind({});
AddItemFormStory.args = {callBack:action('Button inside form clicked')}

