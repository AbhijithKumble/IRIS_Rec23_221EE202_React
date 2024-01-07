import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Home from "./components/home/Home.js";
import Login from "./components/auth/Login.js";
import Logout from "./components/auth/Logout.js";
import "./App.css"


const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home"  element={<Home />} />
          <Route path="/logout"  element={<Logout />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
