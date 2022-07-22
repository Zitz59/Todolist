import React, {useEffect, useState} from 'react'
import {todolistsApi} from '../api/todolists-api';

export default {
    title: 'API'
}
export const GetTodolists = () => {

    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsApi.getTodolists()
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
       todolistsApi.createTodolist("sukaBlyat")
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
       todolistsApi.deleteTodolist('50d262a8-e535-4a8c-b601-c6d3ad9af63e')
            .then((res) => {
                debugger
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
todolistsApi.updateTodolist('8e10d42a-a83b-4e66-8a72-5ae632b3a329','ASgaga4141vgga')
            .then((res) => {
                debugger
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
