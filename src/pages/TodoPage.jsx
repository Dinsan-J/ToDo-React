import React, { useEffect, useState, useRef } from "react";
import Header from "../components/Header";
import Pagination from "../components/Pagination";
import { getTodos, getTodoById } from "../services/todoService"; // Import API service
import Popup from "../components/TodoDetailsPopup";

function TodoPage() {
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const popupRef = useRef(null);
  const todosPerPage = 9;
  const pagesVisited = pageNumber * todosPerPage;

  // Fetch todos on component mount
  useEffect(() => {
    const fetchTodos = async () => {
      const data = await getTodos();
      setTodos(data);
    };
    fetchTodos();
  }, []);

  // Fetch and display a single todo
  const handleTodoClick = async (id, event) => {
    const data = await getTodoById(id);
    if (data) {
      setSelectedTodo(data);
    }

    const buttonRect = event.target.getBoundingClientRect();
    const popupWidth = 250;
    const screenWidth = window.innerWidth;

    let leftPosition = buttonRect.left + window.scrollX - popupWidth;
    let topPosition = buttonRect.top + window.scrollY + buttonRect.height + 5;

    if (leftPosition < 0) {
      leftPosition = 10;
    }

    if (leftPosition + popupWidth > screenWidth) {
      leftPosition = screenWidth - popupWidth - 10;
    }

    setPopupPosition({ top: topPosition, left: leftPosition });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setSelectedTodo(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const pageCount = Math.ceil(todos.length / todosPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <Header />
      <br />
      <h2 className="text-2xl font-bold mb-4">ToDo List</h2>
      <table className="w-full border-collapse border border-gray-600 shadow-md shadow-teal-500 transition-all duration-500">
        <thead>
          <tr className="bg-gray-700 text-white">
            <th className="border border-gray-600 px-4 py-2 text-center">ID</th>
            <th className="border border-gray-600 px-4 py-2 text-center">
              Title
            </th>
            <th className="border border-gray-600 px-4 py-2 text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {todos
            .slice(pagesVisited, pagesVisited + todosPerPage)
            .map((todo) => (
              <tr key={todo.id}>
                <td className="border border-gray-600 px-4 py-2 text-center">
                  {todo.id}
                </td>
                <td className="border border-gray-600 px-4 py-2">
                  {todo.title}
                </td>
                <td className="border border-gray-600 px-4 py-2 text-center">
                  <button
                    onClick={(event) => handleTodoClick(todo.id, event)}
                    className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-800"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="mt-4"></div>
      {todos.length > 0 && (
        <Pagination pageCount={pageCount} onPageChange={changePage} />
      )}
      {selectedTodo && (
        <Popup
          todo={selectedTodo}
          position={popupPosition}
          onClose={() => setSelectedTodo(null)}
        />
      )}
    </div>
  );
}

export default TodoPage;
