import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// components
import Todo from '../components/Todo';

// API
import { getTodos, postTodo } from '../modules/API';

const TodoList = () => {
  const token = window.localStorage.getItem('token');

  const navigate = useNavigate();

  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setIsSuccess(false);

    token
      ? getTodos(token)
          .then(res => setTodoList(res.data))
          .catch(err => {
            alert(err.response.data.message);
            navigate('/signin');
          })
      : navigate('/signin');
  }, [isSuccess, navigate, token]);

  const [todoList, setTodoList] = useState([]);

  const [newTodo, setNewTodo] = useState('');

  const todoHandler = event => {
    setNewTodo(event.target.value);
  };

  const submitHandler = event => {
    event.preventDefault();

    postTodo({ todo: newTodo }, token)
      .then(() => {
        setIsSuccess(true);
        setNewTodo('');
      })
      .catch(err => alert(err.response.data.message));
  };

  return (
    <Wrapper>
      <h1>To do list</h1>
      <form onSubmit={submitHandler}>
        <Input
          type="text"
          value={newTodo}
          onChange={todoHandler}
          data-testid="new-todo-input"
        />
        <Button type="submit" data-testid="new-todo-add-button">
          추가
        </Button>
      </form>

      <ul>
        {todoList.map(el => {
          const { id, todo, isCompleted } = el;
          return (
            <Todo
              key={id}
              id={id}
              todo={todo}
              isCompleted={isCompleted}
              setIsSuccess={setIsSuccess}
            />
          );
        })}
      </ul>
    </Wrapper>
  );
};

export default TodoList;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
`;

const Input = styled.input`
  width: 200px;
  font-size: 13px;
  padding: 5px;
  margin: 10px;
`;
const Button = styled.button`
  width: 50px;
  padding: 10px;
  margin: 3px;
  font-size: 10px;
  color: white;
  background-color: black;
  border: none;
  cursor: pointer;
`;
