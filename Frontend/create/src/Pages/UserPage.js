import "../Styling/UserPage.css";
import { Navbar } from "react-bootstrap";
import React from "react";
import { Link } from "react-router-dom";

const UserPage = () => {
  return (
    <div className="Home">
      <Navbar className="Navbar">
        <Navbar.Brand href="#home">
          <Link to="/">
            <button className="buttonNav">
              <span className="textButton">Home</span>
            </button>
          </Link>
          <Link to="/books">
            <button className="buttonNav">
              <span className="textButton">Books</span>
            </button>
          </Link>
          <Link to="/new-book">
            <button className="buttonNav">
              <span className="textButton">Add a new book</span>
            </button>
          </Link>
          <Link to="/new-user">
            <button className="buttonNav">
              <span className="textButton">Save a new user</span>
            </button>
          </Link>
        </Navbar.Brand>
      </Navbar>
      <div className="containerBooks"></div>
    </div>
  );
};

export default UserPage;
