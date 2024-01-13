import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "./components/home/Home.js";
import Login from "./components/auth/Login.js";
import Logout from "./components/auth/Logout.js";
import Apply from "./components/applications/Apply.js";
import Create from "./components/applications/Create.js";
import View from "./components/applications/View.js";


import "./App.css"


const App = () => {

  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          {isLoggedIn && <Route path="/home"  element={<Home />} />}
          {isLoggedIn && <Route path="/apply"  element={<Apply />} /> }
          {isLoggedIn && <Route path="/create"  element={<Create />} /> }
          {isLoggedIn && <Route path="/view"  element={<View />} /> }
          {isLoggedIn && <Route path="/logout"  element={<Logout />} /> }
        </Routes>
      </Router>
    </div>
  );
}

export default App;
