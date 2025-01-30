import React, { useState, useEffect } from "react";
import axios from "axios";

const TodoDetailsPopup = ({ todoId, onClose }) => {
  const [todoDetails, setTodoDetails] = useState(null);

  useEffect(() => {
    if (todoId) {
      axios
        .get(`https://jsonplaceholder.typicode.com/todos/${todoId}`)
        .then((response) => setTodoDetails(response.data));
    }
  }, [todoId]);

  if (!todoDetails) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-lg">
        <h2 className="text-2xl mb-4">{todoDetails.title}</h2>
        <p>{todoDetails.completed ? "Completed" : "Pending"}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white p-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TodoDetailsPopup;
