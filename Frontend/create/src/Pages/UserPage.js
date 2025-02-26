import styles from "../Styling/UserPage.module.css";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import React, { useState, useEffect } from "react";

ModuleRegistry.registerModules([AllCommunityModule]);

const UserPage = () => {
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/library/users")
      .then((response) => response.json())
      .then((data) => setRowData(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const [colDefs] = useState([
    { field: "name", headerName: "Name", sortable: true, filter: true },
    { field: "email", headerName: "Email", sortable: true, filter: true },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      sortable: true,
      filter: true,
    },
    { field: "id", headerName: "ID", sortable: true, filter: true },
  ]);

  const defaultColDef = {
    flex: 1,
    resizable: true,
  };

  return (
    <div className={styles.Home}>
      <Navbar className={styles.Navbar}>
        <Navbar.Brand>
          <Link to="/">
            <button className={styles.buttonNav}>
              <span className={styles.textButton}>Home</span>
            </button>
          </Link>
          <Link to="/books">
            <button className={styles.buttonNav}>
              <span className={styles.textButton}>Books</span>
            </button>
          </Link>
          <Link to="/new-book">
            <button className={styles.buttonNav}>
              <span className={styles.textButton}>Add a new book</span>
            </button>
          </Link>
          <Link to="/new-user">
            <button className={styles.buttonNav}>
              <span className={styles.textButton}>Save a new user</span>
            </button>
          </Link>
        </Navbar.Brand>
      </Navbar>
      <div className={styles.container}>
        <input
          className={styles.inputSearch}
          type="text"
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
