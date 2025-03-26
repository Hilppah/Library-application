import React, { useState, useEffect } from "react";
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
  const [rowData, setRowData] = useState([]);
  const [email, setEmail] = useState("");
  const [book, setBook] = useState({
    borrowBookInput: "",
    isRented: false,
  });

  useEffect(() => {
    fetch("http://localhost:8080/library/rentedBooks")
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((item) => ({
          title: item.title,
          rentedDate: item.rentedDate,
          dueDate: item.dueDate,
          renterName: item.renterName,
        }));
        setRowData(formattedData);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const [colDefs] = useState([
    { field: "title", headerName: "Title", sortable: true, filter: true },
    { field: "author", headerName: "Author", sortable: true, filter: true },
    {
      field: "rentedDate",
      headerName: "Borrowed date",
      sortable: true,
      filter: true,
    },
    {
      field: "renterName",
      headerName: "Customer's name",
      sortable: true,
      filter: true,
    },
    {
      field: "dueDate",
      headerName: "Due date",
      sortable: true,
      filter: true,
    },
  ]);

  const defaultColDef = {
    flex: 1,
    sortable: true,
    filter: true,
    resizable: true,
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "borrowNameInput") {
      setEmail(value);
    } else if (name === "borrowBookInput") {
      setBook((prevBook) => ({ ...prevBook, borrowBookInput: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/library/rent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerId: email,
          bookId: book.borrowBookInput,
        }),
      });
      console.log("Response:", response);
      if (!response.ok) {
        throw new Error("Failed to borrow book");
      }

      alert("Book borrowed successfully!");
      setBook({ ...book, isRented: true });
    } catch (error) {
      console.error("Error renting book:", error);
    }
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
            <form onSubmit={handleSubmit}>
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
                  value={email}
                  onChange={handleInputChange}
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
                  value={book.borrowBookInput}
                  onChange={handleInputChange}
                />
                <button type="submit" className={styles.buttonBorrow}>
                  <span className={styles.textButton}>Borrow</span>
                </button>
              </div>
            </form>
          </section>
          <section className={styles.containerReturn}>
            <h3 className={styles.h3}>Return a Book</h3>
            <form onSubmit={handleSubmit}>
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
                <button type="submit" className={styles.buttonBorrow}>
                  <span className={styles.textButton}>Return</span>
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
