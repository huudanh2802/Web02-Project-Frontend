import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from "./authentication/Login";
import Signup from "./authentication/Signup";
import Verification from "./authentication/Verification";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verification" element={<Verification />} />

        <Route path="" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
