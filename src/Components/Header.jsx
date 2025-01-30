import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa"; // Import logout icon
import { useState } from "react"; // Import useState for loading state
import { useAuth } from "../context/AuthContext"; // Correct import for authentication

function Header() {
  const [isLoggingOut, setIsLoggingOut] = useState(false); // Loading state for logout
  const navigate = useNavigate();
  const location = useLocation(); // Get current URL
  const { logout } = useAuth();

  const handleLogout = () => {
    setIsLoggingOut(true); // Start loading
    logout(); // Call logout from useAuth hook
    setTimeout(() => {
      navigate("/login");
    }, 1500); // Simulate logout delay
  };

  return (
    <nav className="bg-teal-900 p-2 rounded-lg shadow-md pl-0 pr-0">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Side - App Name */}
        <div className="text-white font-bold text-2xl">
          <Link
            to="/todo"
            className="hover:text-gray-300 transition duration-300 ease-in-out transform hover:scale-105"
          >
            ToDo App
          </Link>
        </div>

        <div className="flex items-center space-x-6">
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
            disabled={isLoggingOut}
            className="bg-red-500 text-white hover:bg-red-700 px-4 py-2 rounded-lg flex items-center gap-2 transition duration-300 ease-in-out transform hover:scale-105 min-w-[140px] justify-center" // min-width ensures fixed size, justify-center aligns content
          >
            {isLoggingOut ? (
              <span
                className="loading loading-ring loading-lg text-white"
                style={{ width: "25px", height: "25px" }}
              ></span>
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
