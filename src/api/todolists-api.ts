import axios from 'axios';

const settings = {
    withCredentials: true,
    headers: {'API-KEY': '6b74dff9-4a4a-410f-be7c-0e00f1a06ec7'}
}

export const todolistsApi = {

    getTodolists() {
        const promise = axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
        return promise
    },

    createTodolist(title: string) {
        return axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: title}, settings)
    },

    deleteTodolist(id: string) {
        return axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, settings)
    },
    updateTodolist(id: string, title: string) {
        return axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {title: title}, settings)
    }
}