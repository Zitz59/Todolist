import React, {ChangeEvent, useState} from 'react';


type EditableSpanPropsType = {
    title:string
    callBack:(newTitle:string)=>void
}

const EditableSpan = (props:EditableSpanPropsType) => {
    let [edit,setEdit] = useState(false)
    let [newTitle, setNewTitle] = useState(props.title)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)}

    const onDoubleClickHandler = () => {
        setEdit(!edit)
        props.callBack(newTitle)
    }

    return (

        edit ?
            <input value={newTitle} onChange={onChangeHandler} onBlur={onDoubleClickHandler} autoFocus />
            :<span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
    );
};

export default EditableSpan;