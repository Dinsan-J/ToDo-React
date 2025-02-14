<<<<<<< HEAD
=======
import React from "react";
>>>>>>> da4c493 (Final commit - React ToDo App)
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/LoginPage";
import ToDo from "./pages/TodoPage";
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <AuthProvider>
      {" "}
      {/* Wrap the Routes with AuthProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/todo" element={<ToDo />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

export default App;
