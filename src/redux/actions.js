import axios from 'axios';
import { GET_ALL_TASKS, TASKS_LOADING, ADD_TASK, GET_ERRORS, UPDATE_TASK, DELETE_TASK } from './types';



export const getAllTasks = () => async dispatch => {
    dispatch(tasksLoading());
    const result = await axios.get('http://localhost:7777/api/tasks/')
    dispatch({
        type: GET_ALL_TASKS,
        payload: result.data
    })
    
}

export const addTask = (newTask) => dispatch => {
    dispatch(tasksLoading());
    axios.post('http://localhost:7777/api/tasks', newTask)
        .then(res => dispatch({
            type: ADD_TASK,
            payload: res.data
        }))
        .catch(err =>  dispatch({
                type: GET_ERRORS,
                payload: err.response  
        }))
}

export const updateTask = (id, updatedTask) => dispatch => {
    dispatch(tasksLoading());
    axios.post(`http://localhost:7777/api/tasks/${id}`, updatedTask)
        .then(res => dispatch({
            type: UPDATE_TASK,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response
        }))

}

export const deleteTask = (id) => dispatch =>{
    axios.delete(`http://localhost:7777/api/tasks/${id}`)
    .then(res => dispatch({
        type: DELETE_TASK,
        payload: res.data
    }))
    .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }))
}


export const tasksLoading = () => {
    return {
        type: TASKS_LOADING
    }
}