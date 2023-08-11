import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// API
import { postSignin } from "../modules/API";

const PASSWORD_MIN_LENGTH = 8;

const Signin = () => {
  const token = window.localStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    token && navigate("/todo");
  }, [navigate, token]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailHander = (event) => {
    const emailInput = event.target.value;
    setEmail(emailInput);
  };

  const passwordHandler = (event) => {
    const passwordInput = event.target.value;
    setPassword(passwordInput);
  };

  const isValid = email.includes("@") && password.length >= PASSWORD_MIN_LENGTH;

  const submitHandler = (event) => {
    event.preventDefault();

    postSignin({ email, password })
      .then((res) => {
        window.localStorage.setItem("token", res.data.access_token);
        navigate("/todo");
      })
      .catch((err) => alert(err.response.data.message));
  };

  const navigateToSignup = () => {
    navigate("/signup");
  };

  return (
    <Wrapper onSubmit={submitHandler}>
      <h1>로그인</h1>
      <SigninInput
        type="email"
        value={email}
        onChange={emailHander}
        placeholder="아이디 (e-mail)"
        data-testid="email-input"
      />
      <SigninInput
        type="password"
        value={password}
        onChange={passwordHandler}
        placeholder="비밀번호 (8자이상)"
        data-testid="password-input"
      />
      <ButtonWrap>
        <Button type="submit" disabled={!isValid} data-testid="signin-button">
          로그인
        </Button>
        <Button
          type="button"
          onClick={navigateToSignup}
          data-testid="signup-button"
        >
          회원가입
        </Button>
      </ButtonWrap>
    </Wrapper>
  );
};

export default Signin;

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
`;

const SigninInput = styled.input`
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

const ButtonWrap = styled.div`
  margin: 20px;
`;

const Button = styled.button`
  width: 100px;
  padding: 12px;
  margin: 10px;
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
