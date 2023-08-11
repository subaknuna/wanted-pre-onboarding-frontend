import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// API
import { postSignup } from '../modules/API';

const Signup = () => {
  const token = window.localStorage.getItem('token');

  const navigate = useNavigate();

  useEffect(() => {
    token && navigate('/todo');
  }, [navigate, token]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const passwordConfirmed = password === confirmPassword;

  const emailHander = event => {
    const emailInput = event.target.value;
    setEmail(emailInput);
  };

  const passwordHandler = event => {
    const passwordInput = event.target.value;
    setPassword(passwordInput);
  };

  const isValid = email.includes('@') && password.length >= 8;

  const submitHandler = event => {
    event.preventDefault();
    postSignup({ email, password })
      .then(res => {
        navigate('/signin');
      })
      .catch(err => alert(err.response.data.message));
  };

  const passwordConfirmHandler = event => {
    const confirmPassword = event.target.value;
    setConfirmPassword(confirmPassword);
  };

  return (
    <Wrapper>
      <H1>회원가입</H1>
      <Input
        type="email"
        value={email}
        onChange={emailHander}
        placeholder="아이디 (e-mail)"
        data-testid="email-input"
      />
      <Input
        type="password"
        value={password}
        onChange={passwordHandler}
        placeholder="비밀번호 (8자이상)"
        data-testid="password-input"
      />

      <Input
        type="password"
        value={confirmPassword}
        onChange={passwordConfirmHandler}
        placeholder="비밀번호 확인"
        data-testid="password-input"
      />
      {!!confirmPassword && !passwordConfirmed && (
        <Span className="checking">비밀번호가 일치하지 않습니다.</Span>
      )}

      <Button
        type="submit"
        onClick={submitHandler}
        disabled={!isValid || !passwordConfirmed}
        data-testid="signup-button"
      >
        가입하기
      </Button>
    </Wrapper>
  );
};

export default Signup;

//styling
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
`;

const H1 = styled.h1``;

const Input = styled.input`
  width: 300px;
  font-size: 18px;
  padding: 10px;
  margin: 10px;
  border-radius: 15px;
  ::placeholder {
    font-size: 15px;
    color: gray;
  }
`;
const Button = styled.button`
  width: 100px;
  padding: 12px;
  margin: 20px;
  font-size: 15px;
  color: white;
  font-weight: bolder;
  background-color: black;
  border: none;
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
  }
`;

const Span = styled.span`
  width: 300px;
  font-size: 12px;
  display: flex;
  color: red;
`;
