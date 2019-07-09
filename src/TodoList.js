import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getAllTasks } from './redux/actions';
import Todo from './Todo';
import NewTodoForm from './NewTodoForm';



class TodoList extends Component {

    state = {
        filter: 'low'
    }

    
    componentDidMount() {
        this.props.getAllTasks();
    }

    handleChange = event => {
        this.setState({filter: event.target.value});
    }


    render() {
        const { todos } = this.props;
        const  todosShow = todos && todos.filter(todo => todo.importance === this.state.filter).map((todo, i) => {
            return <Todo 
                    key={i} 
                    id={todo._id}
                    task={todo.task} 
                    date={todo.date} 
                    completed={todo.completed}
                    importance={todo.importance} 
                />
        })

        return (
            <TodoListContainer>
                <TodoListTitle>Todo List</TodoListTitle>
                <ImportanceFilter
                    value={this.state.filter}
                    onChange={this.handleChange}
                >
                    <option defaultValue value='low'>Low</option>
                    <option value='high'>High</option>
                    <option value='super high'>Super High</option>
                </ImportanceFilter>
                <TodoListUl>{todosShow}</TodoListUl>
                <NewTodoForm
                    createTodo={this.createTodo}
                />
            </TodoListContainer>
        )
    }
}

const TodoListContainer = styled.div`
    margin: 4rem auto;
    padding: 2rem 3rem 3rem;
    max-width: 500px;
    background: #ff6666;
    color: #fff;
    box-shadow: -20px -20px 0px 0px rgba(100, 100, 100, 0.1);
`;

const TodoListUl = styled.ul`
    margin-top: 2.6rem;
    list-style: none;
`;

const TodoListTitle = styled.h1`
    font-weight: normal;
    font-size: 2.6rem;
    letter-spacing: 0.05rem;
    border-bottom: 1px solid rgba(255,255,255,0.3)
`;

const ImportanceFilter = styled.select`
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

const mapStateToProps = state => ({
    todos: state.tasks
})

export default connect(mapStateToProps, { getAllTasks })(TodoList);