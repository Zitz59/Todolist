import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from '@material-ui/core';

type AddItemFormPropsType = {
    callBack: (newTitle: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }
    const addTask = () => {
        let newTitle = title.trim();
        if (newTitle!== '') {
            props.callBack(newTitle);
            setTitle('');
        } else {
            setError('Title is required');
        }
    }

    return (
        <div>
            <TextField variant={'outlined'}
                value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? 'error' : ''}
            />
            <Button  variant={"contained"} color={"primary"} onClick={addTask}>x</Button>
            {error && <div className="error-message">{error}</div>}
        </div>
    )
}