import React, {ChangeEvent, useCallback, useState} from 'react';
import {TextField} from '@material-ui/core';


type EditableSpanPropsType = {
    title: string
    callBack: (newTitle: string) => void
}

const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    let [edit, setEdit] = useState(false)
    let [newTitle, setNewTitle] = useState(props.title)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const onDoubleClickHandler = useCallback(() => {
        setEdit(!edit)
        props.callBack(newTitle)
    },[props.callBack])

    return (

        edit ?
            <TextField variant={'outlined'} value={newTitle} onChange={onChangeHandler} onBlur={onDoubleClickHandler}
                       autoFocus/>
            : <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
    );
});

export default EditableSpan;