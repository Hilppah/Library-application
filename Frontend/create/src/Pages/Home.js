import React, { useState, useEffect, useCallback } from "react";
import styles from "../Styling/Home.module.css";
import Navbar from "react-bootstrap/Navbar";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { Link } from "react-router-dom";

ModuleRegistry.registerModules([AllCommunityModule]);

const HomePage = () => {
  const [rowData, setRowData] = useState([]);
  const [rowData2, setRowData2] = useState([]);
  const [setEmail] = useState("");
  const [book, setBook] = useState({ borrowBookInput: "" });
  const [selectedBook, setSelectedBook] = useState(null);
  const [users, setUsers] = useState([]);
  const [customerId, setCustomerId] = useState("");

  useEffect(() => {
    fetchUsers();
    fetchRentedBooks();
    fetchAvailableBooks();
  }, []);

  const fetchUsers = useCallback(() => {
    fetch("http://localhost:8080/library/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const fetchRentedBooks = useCallback(() => {
    fetch("http://localhost:8080/library/rentedBooks")
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((item) => ({
          title: item.title,
          rentedDate: item.rentedDate,
          renterId: item.renterId,
          bookId: item.bookId,
          dueDate: item.dueDate,
          renterName: item.renterName,
        }));
        setRowData(formattedData);
      })
      .catch((error) => console.error("Error fetching rented books:", error));
  }, []);

  const fetchAvailableBooks = useCallback(() => {
    fetch("http://localhost:8080/library/books?available=true")
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((item) => ({
          id: item.id,
          title: item.title,
          author: item.author,
          available: item.available ? "Yes" : "No",
          genre: item.genre || "Unknown",
          year: item.year || "N/A",
        }));
        setRowData2(formattedData);
      })
      .catch((error) =>
        console.error("Error fetching available books:", error)
      );
  }, []);

  const handleReturnSubmit = async (e) => {
    e.preventDefault();
    if (!selectedBook) {
      alert("Please select a book to return.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/library/returnBook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookId: selectedBook.bookId,
          rentedDate: selectedBook.rentedDate,
          dueDate: selectedBook.dueDate,
          title: selectedBook.title,
          renterName: selectedBook.renterName,
          renterId: selectedBook.renterId,
        }),
      });

      const message = await response.text();

      if (response.ok) {
        alert(`Success: ${message}`);
        setSelectedBook(null);
        fetchRentedBooks();
        fetchAvailableBooks();
      } else {
        alert(`Error: ${message}`);
      }
    } catch (error) {
      alert("An error occurred while returning the book.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const queryParams = new URLSearchParams({
        customerId: customerId,
        bookId: book.borrowBookInput,
      }).toString();

      const response = await fetch(
        `http://localhost:8080/library/rent?${queryParams}`,
        { method: "POST" }
      );

      const message = await response.text();

      if (response.ok) {
        alert(message);
        setBook({ borrowBookInput: "" });
        setCustomerId("");
        fetchRentedBooks();
      } else if (response.status === 409) {
        alert(`Could not borrow book: ${message}`);
      } else {
        alert("Conflict");
      }
    } catch (error) {
      console.error("Error renting book:", error);
      alert("Error. Failed to rent book.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "borrowNameInput") {
      setEmail(value);
    } else if (name === "borrowBookInput") {
      setBook((prevBook) => ({ ...prevBook, borrowBookInput: value }));
    }
  };

  const defaultColDef = {
    flex: 1,
    sortable: true,
    filter: true,
    resizable: true,
  };

  const colDefs = [
    { field: "title", headerName: "Title", sortable: true, filter: true },
    { field: "renterName", headerName: "Customer's name", sortable: true, filter: true },
    { field: "rentedDate", headerName: "Borrowed date", sortable: true, filter: true },
    { field: "dueDate", headerName: "Due date", sortable: true, filter: true, cellStyle: (params) => {
      const dueDate = new Date(params.value);
      const today = new Date();
      return dueDate < today ? { color: "red", fontWeight: "bold" } : {};
    }},
  ];

  return (
    <div className={styles.Home}>
      <Navbar className={styles.Navbar}>
        <Navbar.Brand>
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
                  htmlFor="borrowNameInput"
                  className={styles.borrowReturnText}
                >
                  Customer:
                </label>
                <select
                  id="borrowNameInput"
                  name="borrowNameInput"
                  className={styles.inputField}
                  value={customerId}
                  onChange={(e) => setCustomerId(e.target.value)}
                >
                  <option value="">Select a customer</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name} ({user.email})
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label
                  htmlFor="borrowBookInput"
                  className={styles.borrowReturnText}
                >
                  Book Title:
                  <select
                    id="borrowBookInput"
                    name="borrowBookInput"
                    className={styles.inputField}
                    value={book.borrowBookInput}
                    onChange={handleInputChange}
                  >
                    <option value="">Select a book</option>
                    {rowData2.map((book) => (
                      <option key={book.id} value={book.id}>
                        {book.title} - {book.author}
                      </option>
                    ))}
                  </select>
                </label>
                <button type="submit" className={styles.buttonBorrow}>
                  <span className={styles.textButton}>Borrow</span>
                </button>
              </div>
            </form>
          </section>

          <section className={styles.containerReturn}>
            <form onSubmit={handleReturnSubmit} className={styles.returnForm}>
              <h3 className={styles.h3}>Return a Book</h3>

              <div className={styles.inputGroup}>
                <select
                  id="book-select"
                  value={selectedBook?.bookId || ""}
                  className={styles.inputField}
                  onChange={(e) => {
                    const selected = rowData.find(
                      (b) => b.bookId === e.target.value
                    );
                    setSelectedBook(selected);
                  }}
                >
                  <option value="">-- Select a book --</option>
                  {rowData.map((book) => (
                    <option key={book.bookId} value={book.bookId}>
                      {book.title}
                    </option>
                  ))}
                </select>
                {selectedBook && (
                  <p style={{ marginTop: "0.5rem", color: "#555" }}>
                    <strong>Rented by:</strong> {selectedBook.renterName}
                  </p>
                )}
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
