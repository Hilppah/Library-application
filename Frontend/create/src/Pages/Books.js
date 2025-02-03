import "../Styling/Books.css";
import { Navbar } from "react-bootstrap";
import React from "react";
import { Link } from "react-router-dom";

const BookPage = () => {
  return (
    <div className="Home">
      <Navbar className="Navbar">
        <Navbar.Brand href="#home">
          <Link to="/">
            <button className="buttonHome">
              <span className="textButton">Home</span>
            </button>
          </Link>
          <Link to="/new-book">
            <button className="buttonReturn">
              <span className="textButton">Add a new book</span>
            </button>
          </Link>
          <Link to="/users">
            <button className="buttonUsers">
              <span className="textButton">Users</span>
            </button>
          </Link>
          <Link to="/new-user">
            <button className="buttonSaveUser">
              <span className="textButton">Save new user</span>
            </button>
          </Link>
        </Navbar.Brand>
      </Navbar>
      <div className="containerBooks"></div>
    </div>
  );
};

export default BookPage;
