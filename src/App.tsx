import './App.css';
import AddUser from "./routes/UserAdd";
import User from "./routes/User";
import UserList from "./routes/UserList";
import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (    
    <div>
    <nav className="navbar navbar-expand navbar-dark bg-dark">      
      <div className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to={"/Users"} className="nav-link">
            Users
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/add"} className="nav-link">
            Add
          </Link>
        </li>
      </div>
    </nav> 

      <div className="container mt-3">
        <Routes>
            <Route path="/" element={<UserList/>} />
            <Route path="/users" element={<UserList/>} />
            <Route path="/user/:id" element={<User/>} />
            <Route path="/add" element={<AddUser/>} />
        </Routes>
      </div>
    </div>
  );
}
}


export default App;