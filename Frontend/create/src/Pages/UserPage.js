import "../Styling/UserPage.css";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import React, { useState } from "react";

ModuleRegistry.registerModules([AllCommunityModule]);

const UserPage = () => {
  const [rowData, setRowData] = useState([
    {
      name: "Matti meikäläinen",
      email: "Matti@hotmail.com",
      phoneNumber: "050123456",
      ID: "1",
      borrowedBooks: "-",
    },
    {
      name: "Minna meikäläinen",
      email: "Minna@hotmail.com",
      phoneNumber: "050098765",
      ID: "2",
      borrowedBooks: "-",
    },
  ]);

  const [colDefs, setColDefs] = useState([
    { field: "name", headerName: "Name" },
    { field: "email", headerName: "Email" },
    { field: "phoneNumber", headerName: "Phone number" },
    { field: "ID", headerName: "ID" },
    { field: "borrowedBooks", headerName: "Borrowed Books" },
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
      <div className="container">
        <input
          className="inputSearch"
          type="text"
          id="SearchInput"
          name="SearchInput"
          placeholder="Search..."
        />
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

export default UserPage;
