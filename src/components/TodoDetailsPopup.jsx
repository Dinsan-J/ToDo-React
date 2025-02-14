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
