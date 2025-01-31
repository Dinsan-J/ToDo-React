import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

/**
 * Fetches a list of todos (first 200).
 * @returns {Promise<Array>}
 */
export const getTodos = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.slice(0, 200);
  } catch (error) {
    console.error("Error fetching todos:", error);
    return [];
  }
};

/**
 * Fetches details of a single todo by ID.
 * @param {number} id - The ID of the todo.
 * @returns {Promise<Object>}
 */
export const getTodoById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching todo with ID ${id}:`, error);
    return null;
  }
};
