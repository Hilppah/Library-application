import React, { useState } from "react";
import styles from "../Styling/Home.module.css";
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
    <div className={styles.Home}>
      <Navbar className={styles.Navbar}>
        <Navbar.Brand href="#home">
          <Link to="/Books">
            <button className={styles.buttonNav}>
              <span className={styles.textButton}>Books</span>
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
              <span className={styles.textButton}>Save a new user</span>
            </button>
          </Link>
        </Navbar.Brand>
      </Navbar>

      <div className={styles.container}>
        <div className={styles.Left}>
          <h2 className={styles.h2}>Most recently borrowed books</h2>
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

        <div className={styles.Right}>
          <section className={styles.containerBorrow}>
            <h3 className={styles.h3}>Borrow a Book</h3>
            <form>
              <div className={styles.inputGroup}>
                <label
                  htmlFor="styles.borrowNameInput"
                  className={styles.borrowReturnText}
                >
                  Customers email:
                </label>
                <input
                  type="text"
                  id="borrowNameInput"
                  name="borrowNameInput"
                  placeholder="Enter customer's email"
                  className={styles.inputField}
                />
              </div>
              <div className={styles.inputGroup}>
                <label
                  htmlFor="borrowBookInput"
                  className={styles.borrowReturnText}
                >
                  Book Title:
                </label>
                <input
                  type="text"
                  id="borrowBookInput"
                  name="borrowBookInput"
                  placeholder="Enter book title"
                  className={styles.inputField}
                />
                <button type="submit" className={styles.buttonBorrow}>
                  <span className={styles.textButton}>Borrow</span>
                </button>
              </div>
            </form>
          </section>

          <section className={styles.containerReturn}>
            <h3 className={styles.h3}>Return a Book</h3>
            <div className={styles.inputGroup}>
              <label htmlFor="nameInput" className={styles.borrowReturnText}>
                Customers email:
              </label>
              <input
                type="text"
                id="nameInput"
                name="nameInput"
                placeholder="Enter customers email"
                className={styles.inputField}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="bookInput" className={styles.borrowReturnText}>
                Book Title:
              </label>
              <input
                type="text"
                id="bookInput"
                name="bookInput"
                placeholder="Enter book title"
                className={styles.inputField}
              />
              <button className={styles.buttonBorrow}>
                <span className={styles.textButton}>Return</span>
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
