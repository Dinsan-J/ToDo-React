import axios from "axios";

export const fetchTodos = (page = 1, limit = 10) => {
  return axios.get(
    `https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=${limit}`
  );
};

export const fetchTodoDetails = (id) => {
  return axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`);
};
