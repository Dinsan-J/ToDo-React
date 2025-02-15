import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/LoginPage";
import ToDo from "./pages/TodoPage";

import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
