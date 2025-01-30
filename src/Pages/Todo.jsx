import { useEffect, useState, useRef } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Header from "../Components/Header";

function ToDo() {
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const popupRef = useRef(null);
  const todosPerPage = 8;
  const pagesVisited = pageNumber * todosPerPage;

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((response) => setTodos(response.data.slice(0, 200)));
  }, []);

  const handleTodoClick = async (id, event) => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/todos/${id}`
    );
    setSelectedTodo(response.data);

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
      <table className="w-full border-collapse border border-gray-600 shadow-lg shadow-teal-500 transition-all duration-300">
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
      <div className="mt-4"></div> {/* Glow is already applied to the table */}
      {todos.length > 0 && (
        <ReactPaginate
          previousLabel={"< Previous"}
          nextLabel={"Next >"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName="flex justify-center items-center space-x-4 mt-10" // Increased margin-top (mt-6)
          pageClassName="border border-gray-300 px-3 py-1 rounded hover:bg-blue-500 cursor-pointer text-lg"
          activeClassName="bg-blue-500 text-white text-lg"
          pageLinkClassName="flex items-center justify-center w-full h-full"
          previousClassName="flex items-center justify-center cursor-pointer text-lg mx-2"
          nextClassName="flex items-center justify-center cursor-pointer text-lg mx-2"
          breakClassName="px-3 py-1 text-gray-500 cursor-pointer"
          breakLabel="..."
        />
      )}
      {selectedTodo && (
        <div
          ref={popupRef}
          className="absolute bg-gradient-to-r from-teal-500 to-blue-600 text-white p-6 rounded-lg shadow-lg w-80 max-w-full border-2 border-gray-700 transform transition-all duration-300 scale-100 hover:scale-105"
          style={{
            top: popupPosition.top,
            left: popupPosition.left,
            zIndex: 1000,
          }}
        >
          <h3 className="text-2xl font-semibold mb-4">ToDo Details</h3>
          <p className="mb-2">
            <strong>ID:</strong> {selectedTodo.id}
          </p>
          <p className="mb-2">
            <strong>Title:</strong> {selectedTodo.title}
          </p>
          <p className="mb-4">
            <strong>Completed:</strong> {selectedTodo.completed ? "Yes" : "No"}
          </p>
          <button
            onClick={() => setSelectedTodo(null)}
            className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition duration-300 transform hover:scale-105"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default ToDo;
