import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from '@material-ui/core';

type AddItemFormPropsType = {
    callBack: (newTitle: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
    let [title, setTitle] = useState('')
    let [error, setError] = useState<boolean>(false)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false);
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
            setError(true);
        }
    }

    return (
        <div>
            <TextField
                id='outlined-basic'
                label={!error? 'Enter text' : 'Title is required'}
                variant={'outlined'}
                size='small'
                value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                error={error}
                   // className={error ? 'error' : ''}
            />
            <Button  variant={"contained"} color={"primary"} onClick={addTask} style={{maxWidth:"39px",maxHeight:"39px",minWidth:"39px",minHeight:"39px",backgroundColor:"pink"}}>x</Button>
            {/*{error && <div className="error-message">{error}</div>}*/}
        </div>
    )
}