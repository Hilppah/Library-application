import "../Styling/Books.css";
import { Navbar } from "react-bootstrap";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

const BookPage = () => {
  const [rowData, setRowData] = useState([
    {
      title: "Tuntematon Sotilas",
      author: "Väinö Linna",
      publishingYear: 1954,
      genre: "Historical Fiction",
      available: "Yes",
    },
    {
      title: "Sinuhe egyptiläinen",
      author: "Mika Waltari",
      publishingYear: 1945,
      genre: "Historical Fiction",
      available: "No",
    },
    {
      title: "Pohjantähti",
      author: "Antti Tuuri",
      publishingYear: 1982,
      genre: "Drama",
      available: "Yes",
    },
  ]);

  const [colDefs, setColDefs] = useState([
    { field: "title", headerName: "Book title" },
    { field: "author", headerName: "Author" },
    { field: "publishingYear", headerName: "Publishing Year" },
    { field: "genre", headerName: "Genre" },
    { field: "available", headerName: "Available" },
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
          <Link to="/">
            <button className="buttonNav">
              <span className="textButton">Home</span>
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
              <span className="textButton">Save new user</span>
            </button>
          </Link>
        </Navbar.Brand>
      </Navbar>
      <div className="container">
        <div
          className="ag-theme-balham"
          style={{
            height: "85%",
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
    </div>
  );
};

export default BookPage;
