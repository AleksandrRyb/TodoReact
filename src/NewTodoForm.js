import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { addTask } from './redux/actions';
import "react-datepicker/dist/react-datepicker.css";



class NewTodoForm extends Component {

    state = {
        taskName: '',
        taskDate: new Date(),
        taskImportance: 'low'
    }

        
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value})
    }

    handleDate = date => {
        this.setState({taskDate: date})
    }

    handleSubmit = event => {
        event.preventDefault();
        const { taskDate, taskImportance, taskName } = this.state;
        const newTodo = {
            task: taskName,
            date: taskDate,
            importance: taskImportance,
            completed: false
        };

        this.props.addTask(newTodo);
        this.setState({ taskDate: new Date(), taskImportance: 'low', taskName: '' })
    }
    
    render() {
        const { taskDate, taskImportance, taskName } = this.state;
        return (
            <AddForm onSubmit={this.handleSubmit}>
                <FormLabel htmlFor='task'>New Todo</FormLabel>
                <AddTextInput
                    type="text"
                    placeholder="New Todo"
                    id='task' 
                    value={taskName}
                    name='taskName'
                    onChange={this.handleChange}  
                    />
                <AddButton>submit</AddButton>
                <AddImportance 
                    value={taskImportance}
                    onChange={this.handleChange}
                    name='taskImportance'
                >
                    <option defaultValue value='low'>Low</option>
                    <option value='high'>High</option>
                    <option value='super high'>Super High</option>
                </AddImportance>
                <DatePicker
                    selected={taskDate}
                    onChange={this.handleDate}
                    showTimeSelect
                    timeFormat="HH:mm"
                />
            </AddForm>
        )
    }
}

const AddForm = styled.form`
    margin-top: 3rem;
    display: flex;
    flex-wrap: wrap;

`;

const FormLabel = styled.label`
    min-width: 100%;
     margin-bottom: 0.5rem;
    font-size: 1.3rem;
`;

const AddTextInput = styled.input`
    flex-grow: 1;
    border: none;
    background: #f7f1f1;
    padding: 0 1.5em;
    font-size: initial;
    font-family: "Quicksand", sans-serif;
    height: 3rem;
`;

const AddImportance = styled.select`
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

const AddButton = styled.button`
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

export default connect(null, { addTask })(NewTodoForm);