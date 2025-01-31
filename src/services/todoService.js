import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

export const getTodos = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.slice(0, 200);
  } catch (error) {
    console.error("Error fetching todos:", error);
    return [];
  }
};

export const getTodoById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching todo with ID ${id}:`, error);
    return null;
  }
};
