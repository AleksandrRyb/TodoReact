import { GET_ALL_TASKS, TASKS_LOADING, GET_ERRORS, ADD_TASK, UPDATE_TASK, DELETE_TASK } from './types';

const initilState = {
    tasks: [],
    loading: false,
    errors: {}
}

export default function(state = initilState, action) {
    switch(action.type) {
        case TASKS_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_ERRORS: 
            return {
                ...state,
                errors: action.payload
            }
        case GET_ALL_TASKS:
            return {
                ...state,
                tasks: action.payload,
                loading: false
            }
        case ADD_TASK:  
            return {
                ...state,
                tasks: [action.payload, ...state.tasks],
                loading: false
            }
        case UPDATE_TASK:
            return {
                ...state,
                tasks: state.tasks.map(task => {
                    if(task._id === action.payload._id) {
                        return action.payload
                    } else return task
                }),
                loading: false
            }
        case DELETE_TASK: 
            return {
                ...state,
                loading: false,
                tasks: state.tasks.filter(task => task._id !== action.payload)
            }
        default:
            return state;
    }
}