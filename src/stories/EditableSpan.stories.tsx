import React from 'react';

import {action} from '@storybook/addon-actions';
import EditableSpan from '../components/EditableSpan';

export default {
  title: 'Todolist/EditableSpan',
  component:EditableSpan,
}



const changeCallback = action('Value changed')

export const EditableSpanExample = () => {
  return <EditableSpan title={'Start value'} callBack={changeCallback}/>
}

