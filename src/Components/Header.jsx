import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa"; // Import logout icon
import { useState } from "react"; // Import useState for loading state

function Header() {
  const [isLoggingOut, setIsLoggingOut] = useState(false); // Loading state for logout
  const navigate = useNavigate();
  const location = useLocation(); // Get current URL

  const handleLogout = () => {
    setIsLoggingOut(true); // Start loading
    setTimeout(() => {
      localStorage.removeItem("auth");
      navigate("/login");
    }, 1500); // Simulate logout delay
  };

  return (
    <nav className="bg-teal-900 p-2 rounded-lg shadow-md pl-0 pr-0">
      <div className="max-w-7xl mx-auto flex items-center">
        {/* Left Side - App Name */}
        <div className="text-white font-bold text-2xl">
          <Link
            to="/todo"
            className="hover:text-gray-300 transition duration-300 ease-in-out transform hover:scale-105"
          >
            ToDo App
          </Link>
        </div>

        {/* Right Side - Move Buttons Further Right */}
        <div className="flex items-center ml-auto space-x-6">
          {/* ToDo Button with Active Hover Effect */}
          <Link
            to="/todo"
            className={`px-4 py-2 rounded-lg font-medium transition duration-300 ease-in-out transform hover:scale-105 ${
              location.pathname === "/todo"
                ? "bg-white text-teal-900 font-bold hover:bg-gray-200" // Active state hover
                : "text-white hover:bg-white hover:text-teal-900" // Inactive hover
            }`}
          >
            ToDo
          </Link>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            disabled={isLoggingOut} // Disable button during loading
            className="bg-red-500 text-white hover:bg-red-700 px-4 py-2 rounded-lg flex items-center gap-2 transition duration-300 ease-in-out transform hover:scale-105"
          >
            {isLoggingOut ? (
              <span className="loading loading-ring loading-lg text-white"></span> // Spinner while logging out
            ) : (
              <>
                <FaSignOutAlt /> Logout
              </>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Header;
