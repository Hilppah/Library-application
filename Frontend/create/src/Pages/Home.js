import React, { useState } from "react";
import "../Styling/Home.css";
import Navbar from "react-bootstrap/Navbar";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { Router } from "react-router-dom";
import { Link } from "react-router-dom";

ModuleRegistry.registerModules([AllCommunityModule]);

const HomePage = () => {
  const [rowData, setRowData] = useState([
    {
      title: "Tuntematon Sotilas",
      author: "Väinö Linna",
    },
    {
      title: "Sinuhe egyptiläinen",
      author: "Mika Waltari",
    },
    {
      title: "Pohjantähti",
      author: "Antti Tuuri",
    },
  ]);

  const [colDefs, setColDefs] = useState([
    { field: "title", headerName: "Book title" },
    { field: "author", headerName: "Author" },
    { field: "borrowDate", headerName: "Borrowed date" },
    { field: "customerName", headerName: "Customer's name" },
    { field: "returnDate", headerName: "Last return date" },
  ]);

  const defaultColDef = {
    flex: 1,
    sortable: true,
    filter: true,
    resizable: true,
  };

  return (
    <div className="Home">
      <Navbar className="Navbar">
        <Navbar.Brand href="#home">
          <Link to="/Books">
            <button className="buttonNav">
              <span className="textButton">Books</span>
            </button>
          </Link>
          <Link to="/new-book">
            <button className="buttonNav">
              <span className="textButton">Add a new book</span>
            </button>
          </Link>
          <Link to="/users">
            <button className="buttonNav">
              <span className="textButton">Users</span>
            </button>
          </Link>
          <Link to="/new-user">
            <button className="buttonNav">
              <span className="textButton">Save a new user</span>
            </button>
          </Link>
        </Navbar.Brand>
      </Navbar>

      <div className="container">
        <div className="Left">
          <h2 className="h2">Most recently borrowed books</h2>
          <div
            className="ag-theme-balham"
            style={{
              height: "80%",
              width: "90%",
              margin: "auto",
              backgroundColor: "#fff6f5",
            }}
          >
            <AgGridReact
              rowData={rowData}
              columnDefs={colDefs}
              defaultColDef={defaultColDef}
            />
          </div>
        </div>

        <div className="Right">
          <section className="containerBorrow">
            <h3 className="h3">Borrow a Book</h3>
            <form>
              <div className="inputGroup">
                <label htmlFor="borrowNameInput" className="borrowReturnText">
                  Customers email:
                </label>
                <input
                  type="text"
                  id="borrowNameInput"
                  name="borrowNameInput"
                  placeholder="Enter customer's email"
                  className="inputField"
                />
              </div>
              <div className="inputGroup">
                <label htmlFor="borrowBookInput" className="borrowReturnText">
                  Book Title:
                </label>
                <input
                  type="text"
                  id="borrowBookInput"
                  name="borrowBookInput"
                  placeholder="Enter book title"
                  className="inputField"
                />
                <button type="submit" className="buttonBorrow">
                  <span className="textButton">Borrow</span>
                </button>
              </div>
            </form>
          </section>

          <section className="containerReturn">
            <h3 className="h3">Return a Book</h3>
            <div className="inputGroup">
              <label htmlFor="nameInput" className="borrowReturnText">
                Customers email:
              </label>
              <input
                type="text"
                id="nameInput"
                name="nameInput"
                placeholder="Enter customers email"
                className="inputField"
              />
            </div>
            <div className="inputGroup">
              <label htmlFor="bookInput" className="borrowReturnText">
                Book Title:
              </label>
              <input
                type="text"
                id="bookInput"
                name="bookInput"
                placeholder="Enter book title"
                className="inputField"
              />
              <button className="buttonBorrow">
                <span className="textButton">Return</span>
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
