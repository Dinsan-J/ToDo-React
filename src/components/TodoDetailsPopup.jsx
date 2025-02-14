<<<<<<< HEAD
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
=======
import React, { useRef, useEffect } from "react";

function Popup({ todo, position, onClose }) {
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={popupRef}
      className="absolute bg-gradient-to-r from-teal-500 to-blue-600 text-white p-6 rounded-lg shadow-lg w-80 max-w-full border-2 border-gray-700 transform transition-all duration-300 scale-100 hover:scale-105"
      style={{ top: position.top, left: position.left, zIndex: 1000 }}
    >
      <h3 className="text-2xl font-semibold mb-4">ToDo Details</h3>
      <p className="mb-2">
        <strong>ID:</strong> {todo.id}
      </p>
      <p className="mb-2">
        <strong>Title:</strong> {todo.title}
      </p>
      <p className="mb-4">
        <strong>Completed:</strong> {todo.completed ? "Yes" : "No"}
      </p>
      <button
        onClick={onClose}
        className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition duration-300 transform hover:scale-105"
      >
        Close
      </button>
    </div>
  );
}

export default Popup;
>>>>>>> da4c493 (Final commit - React ToDo App)
