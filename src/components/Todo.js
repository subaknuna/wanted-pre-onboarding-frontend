import React, { useState } from 'react';
import styled from 'styled-components';

// API
import { updateTodo, deleteTodo } from '../modules/API';

const Todo = ({ id, todo, isCompleted, setIsSuccess }) => {
  const token = window.localStorage.getItem('token');

  const [task, setTask] = useState(todo);
  const [isDone, setIsDone] = useState(isCompleted);

  const todoHandler = event => {
    setTask(event.target.value);
  };

  const checkboxHandler = event => {
    setIsDone(event.target.checked);
  };

  const [editable, setEditable] = useState(false);

  const editabilityHandler = () => {
    setEditable(true);
  };

  const cancelHandler = () => {
    setEditable(false);
    setTask(todo);
  };

  const updateHandler = () => {
    updateTodo(id, { todo: task, isCompleted: isDone }, token)
      .then(() => {
        setIsSuccess(true);
        setEditable(false);
      })
      .catch(err => alert(err.response.data.message));
  };

  const deleteHandler = () => {
    deleteTodo(id, token)
      .then(() => setIsSuccess(true))
      .catch(err => alert(err.response.data.message));
  };

  return (
    <Wrapper>
      {/* 완료 여부 */}
      <input
        type="checkbox"
        checked={isDone}
        disabled={!editable}
        onChange={checkboxHandler}
      />

      {/* 할일 내용 */}
      <input
        type="text"
        value={task}
        disabled={!editable}
        onChange={todoHandler}
        data-testid="modify-input"
      />

      {/* 수정 버튼 - 수정 버튼 클릭 시 수정하기, 취소하기 버튼 활성화 */}
      {!editable && (
        <Button
          type="button"
          onClick={editabilityHandler}
          data-testid="modify-button"
        >
          수정
        </Button>
      )}

      {/* 수정 모드에서 보여지는 버튼 */}
      {editable && (
        <>
          <Button
            type="button"
            onClick={updateHandler}
            data-testid="submit-button"
          >
            제출
          </Button>
          <Button
            type="button"
            onClick={cancelHandler}
            data-testid="cancel-button"
          >
            취소
          </Button>
        </>
      )}

      {/* 할일 삭제 버튼 */}
      <Button type="button" onClick={deleteHandler} data-testid="delete-button">
        삭제
      </Button>
    </Wrapper>
  );
};

export default React.memo(Todo);

const Wrapper = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 13px;
`;

const Button = styled.button`
  width: 50px;
  padding: 5px;
  margin: 3px;
  font-size: 10px;
  color: white;
  background-color: black;
  border: none;
  cursor: pointer;
`;
