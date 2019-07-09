import React from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { updateTask, deleteTask } from './redux/actions';
import styled, { keyframes, css } from 'styled-components';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


// type Props = {
//     copleted: boolean,
//     date: date,
//     importance: string,
//     task?: string,
//     _id: string
// };

class Todo extends React.Component {

    state = {
        isEditing: false,
        taskName: this.props.task,
        taskDate: new Date(this.props.date),
        taskImportance: this.props.importance
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleDelete = () => {
        this.props.deleteTask(this.props.id)
    }

    toggleForm = () => {
        this.setState({isEditing: !this.state.isEditing})
    }

    handleUpdate = (event) => {
        event.preventDefault();
        const { taskDate, taskImportance, taskName} = this.state;
        const updatedTask = {
            task: taskName,
            importance: taskImportance,
            date: taskDate
        };
        this.props.updateTask(this.props.id, updatedTask)
        this.setState({isEditing: false});
    }

    handleDate = date => {
        this.setState({ taskDate: date })
    }

    handleCompletion = () => {
        const { taskDate, taskImportance, taskName } = this.state;
        const updatedTask = {
            task: taskName,
            importance: taskImportance,
            date: taskDate,
            completed: !this.props.completed
        };
        this.props.updateTask(this.props.id, updatedTask)
        this.setState({ isEditing: false });
    }

    render() {
        const { taskDate, taskImportance, taskName, isEditing } = this.state;
        const {  date, importance, completed } = this.props;
        let task = this.props.task;
        let dotedTask;
        if(!task) task = 'No description!'
        if(task.length > 30) {
            dotedTask = task.substring(0,27)
            dotedTask = dotedTask + '...'    
        } else { 
            dotedTask = task
        }
        let result;
        if(isEditing) {
            result = (
                <TodoContainer>
                    <TodoEditForm onSubmit={this.handleUpdate}>
                        <TodoEditFormLabel htmlFor='task'>Update</TodoEditFormLabel>
                        <TodoEditTextInput
                            type="text"
                            placeholder="New Todo"
                            id='task'
                            value={taskName}
                            name='taskName'
                            onChange={this.handleChange}
                        />
                        <SaveEditButton  onClick={this.handleUpdate}>Save</SaveEditButton>
                        <EditImportance
                            value={taskImportance}
                            onChange={this.handleChange}
                            name='taskImportance'
                        >
                            <option defaultValue value='low'>Low</option>
                            <option value='high'>High</option>
                            <option value='super high'>Super High</option>
                        </EditImportance>
                        <DatePicker
                            selected={taskDate}
                            onChange={this.handleDate}
                            showTimeSelect
                            timeFormat="HH:mm"
                        />
                    </TodoEditForm>
                </TodoContainer>
            )
        } else {
           result = ( 
           <TodoContainer>
                <TodoTask className={completed ? 'completed' : ''} onClick={this.handleCompletion} completed={completed}>
                    {dotedTask}<br></br>{importance}<br></br>
                    <Moment toNow>{date}</Moment>
                </TodoTask>
                <TodoButtonsContainer>
                    <EditButton onClick={this.toggleForm}><i className='fas fa-pen'></i></EditButton>
                    <DeleteButton onClick={this.handleDelete}><i className='fas fa-trash'></i></DeleteButton>
                </TodoButtonsContainer>
            </TodoContainer>
                
           )
        }
        return result;
    }
}

const TodoContainer = styled.div`
    display: flex;
    margin: 0 -3rem 4px;
    padding: 1.1rem 3rem;
    justify-content: space-between;
    align-items: center;
    background: rgba(255,255,255,0.1);
`;

const strikeitem = keyframes`
    to {
        width: calc(100% + 1rem);
    }
`;

const animation = css`
   animation: ${strikeitem}  0.2s forwards;
`;

const TodoTask = styled.li`
    position: relative;
    transition: opacity 0.4s linear;
    opacity: ${props => props.completed ? '0.6' : null};
    &:before {
        content: '';
        position: ${props => props.completed ? 'absolute' : null};
        top: ${props => props.completed ? '50%' : null};
        left: ${props => props.completed ? '-0.5rem' : null};
        display: ${props => props.completed ? 'block' : null};
        width: ${props => props.completed ? '0%' : null};
        height: ${props => props.completed ? '2px' : null};
        background: ${props => props.completed ? '#fff' : null};
        transform: rotate(-45deg);
        ${props => props.completed ? animation : null};
    }
`;

const EditButton = styled.button`
    border: none;
    font-size: 1em;
    margin: 0.4em;
    background: none;
    -webkit-appearance: none;
    cursor: pointer;
    color: #fff;
`;

const DeleteButton = styled.button`
    border: none;
    font-size: 1em;
    margin: 0.4em;
    background: none;
    -webkit-appearance: none;
    cursor: pointer;
    color: #fff;
`

const TodoButtonsContainer = styled.div`
    flex-shrink: 0;
    padding: 0.7em;
`;

const TodoEditForm = styled.form`
    display: flex;
    flex-wrap: wrap;

`;

const TodoEditFormLabel = styled.label`
    min-width: 100%;
    margin-bottom: 0.5rem;
    font-size: 1.3rem;
`;

const TodoEditTextInput  = styled.input`
    flex-grow: 1;
    border: none;
    background: #f7f1f1;
    padding: 0 1.5em;
    font-size: initial;
    font-family: "Quicksand", sans-serif;
    height: 3rem;
`;

const EditImportance = styled.select`
    margin-top: 5px;
    margin-right: 5px;
    flex-grow: 1;
    border: none;
    background: #f7f1f1;
    padding: 0 1.5em;
    font-size: initial;
    font-family: "Quicksand", sans-serif;
    height: 3rem;
`;

const SaveEditButton = styled.button`
    padding: 0 1.3rem;
    border: none;
    background: #ff6666;
    color: white;
    text-transform: uppercase;
    font-weight: bold;
    border: 1px solid rgba(255, 255, 255, 0.3);
    margin-left: 5px;
    cursor: pointer;
    transition: background 0.2s ease-out;
    font-family: "Quicksand", sans-serif;
    height: 3rem;
    &:hover {
        background: #ff5e5e;
    }
`;




 

export default connect(null, { updateTask, deleteTask })(Todo);
