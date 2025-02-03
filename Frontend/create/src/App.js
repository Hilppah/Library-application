import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/Home";
import NewUserPage from "./Pages/NewUser";
import NewBookPage from "./Pages/NewBook";
import BookPage from "./Pages/Books";
import UserPage from "./Pages/UserPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/new-user" element={<NewUserPage />} />
        <Route path="/new-book" element={<NewBookPage />} />
        <Route path="/books" element={<BookPage />} />
        <Route path="/users" element={<UserPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
