import axios from 'axios';

const instance = axios.create({
  baseURL: `https://www.pre-onboarding-selection-task.shop/`,
});

/** POST: 회원가입 API */
const postSignup = async body => {
  const response = await instance.post(`/auth/signup`, body);
  return response;
};

/** POST: 로그인 API */
const postSignin = async body => {
  const response = await instance.post(`/auth/signin`, body);
  return response;
};

/** GET: todo list 불러오기 */
const getTodos = async access_token => {
  const response = await instance.get(`/todos`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return response;
};

/** POST: todo 생성하기 */
const postTodo = async (body, access_token) => {
  const response = await instance.post(`/todos`, body, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return response;
};

/** PUT: todo 수정하기 */
const updateTodo = async (id, body, access_token) => {
  const response = await instance.put(`/todos/${id}`, body, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return response;
};

/** DELETE: todo 삭제하기 */
const deleteTodo = async (id, access_token) => {
  const response = await instance.delete(`/todos/${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return response;
};

export { postSignup, postSignin, getTodos, postTodo, updateTodo, deleteTodo };
