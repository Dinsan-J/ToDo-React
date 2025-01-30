import React from "react";

const TodoItem = ({ todo, onClick }) => {
  return (
    <tr className="border-b">
      <td className="px-4 py-2">{todo.title}</td>
      <td className="px-4 py-2">{todo.completed ? "Completed" : "Pending"}</td>
      <td className="px-4 py-2">
        <button onClick={() => onClick(todo.id)} className="text-blue-500">
          View Details
        </button>
      </td>
    </tr>
  );
};

export default TodoItem;
