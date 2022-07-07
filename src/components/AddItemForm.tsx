import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from '@material-ui/core';

type AddItemFormPropsType = {
    callBack: (newTitle: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    console.log('AddItemForm is called')

    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error) setError(null)
        if (e.key === 'Enter') {
            addTask();
        }
    }
    const addTask = () => {
        let newTitle = title.trim();
        if (newTitle !== '') {
            props.callBack(newTitle);
            setTitle('');
        } else {
            setError('Title is required');
        }
    }

    return (
        <div>
            <TextField
                id="outlined-basic"
                label={!error ? 'Enter text' : 'Title is required'}
                variant={'outlined'}
                size="small"
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                // className={error ? 'error' : ''}
            />
            <Button variant={'contained'} color={'primary'} onClick={addTask} style={{
                maxWidth: '39px',
                maxHeight: '39px',
                minWidth: '39px',
                minHeight: '39px',
                backgroundColor: 'pink'
            }}>+</Button>
            {/*{error && <div className="error-message">{error}</div>}*/}
        </div>
    )
})

// export function AddItemForm(props: AddItemFormPropsType) {
