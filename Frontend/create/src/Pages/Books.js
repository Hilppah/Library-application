import styles from "../Styling/Books.module.css";
import { Navbar } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

const BookPage = () => {
  const [rowData, setRowData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/library/books")
      .then((response) => response.json())
      .then((data) => setRowData(data))
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  useEffect(() => {
    const filtered = rowData.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm, rowData]);

  const [colDefs] = useState([
    { field: "title", headerName: "Book Title", sortable: true, filter: true },
    { field: "author", headerName: "Author", sortable: true, filter: true },
    { field: "genre", headerName: "Genre", sortable: true, filter: true },
    {
      field: "year",
      headerName: "Publication year",
      sortable: true,
      filter: true,
    },
    {
      field: "available",
      headerName: "Available",
      sortable: true,
      filter: true,
      valueFormatter: (params) => (params.value ? "Yes" : "No"),
    },
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
          <Link to="/new-book">
            <button className={styles.buttonNav}>
              <span className={styles.textButton}>Add a new book</span>
            </button>
          </Link>
          <Link to="/users">
            <button className={styles.buttonNav}>
              <span className={styles.textButton}>Users</span>
            </button>
          </Link>
          <Link to="/new-user">
            <button className={styles.buttonNav}>
              <span className={styles.textButton}>Save new user</span>
            </button>
          </Link>
        </Navbar.Brand>
      </Navbar>
      <div className={styles.container}>
        <input
          className={styles.inputSearch}
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <ul className={styles.suggestions}>
            {filteredData.slice(0, 5).map((book, index) => (
              <li key={index} onClick={() => setSearchTerm(book.title)}>
                {book.title}
              </li>
            ))}
          </ul>
        )}
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
            rowData={filteredData}
            columnDefs={colDefs}
            defaultColDef={defaultColDef}
          />
        </div>
      </div>
    </div>
  );
};

export default BookPage;
