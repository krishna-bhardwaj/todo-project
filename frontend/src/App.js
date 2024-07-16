import React from "react";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import Footer from "./components/Footer";
import SignUp from "./components/signup";
import { LoginContextProvider } from "./store/loginContext";
import { TodoItemsContextProvider } from "./store/todoContext";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "./components/login";
import TodoApp from "./components/TodoApp";
const App = () => {
  return (
    <div className="app">
      <Router>
        <TodoItemsContextProvider>
          <LoginContextProvider>
            <Navbar />
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/addTask" element={<TodoApp />} />
            </Routes>
          </LoginContextProvider>
        </TodoItemsContextProvider>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
