import styles from "../Styling/NewUser.module.css";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";

const NewUserPage = () => {
  const [user, setUser] = useState({ name: "", email: "", number: "" });

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/library/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...user }),
      });

      if (!response.ok) {
        throw new Error("Failed to create a customer");
      }

      alert("Customer created succesfully!");
      setUser({ name: "", email: "", number: "" });
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };
  return (
    <div className={styles.Home}>
      <Navbar className={styles.Navbar}>
        <Navbar.Brand href="#home">
          <Link to="/">
            <button className={styles.navButton}>
              <span className={styles.textButton}>Home</span>
            </button>
          </Link>
          <Link to="/books">
            <button className={styles.navButton}>
              <span className={styles.textButton}>Books</span>
            </button>
          </Link>
          <Link to="/new-book">
            <button className={styles.navButton}>
              <span className={styles.textButton}>Add a new book</span>
            </button>
          </Link>
          <Link to="/users">
            <button className={styles.navButton}>
              <span className={styles.textButton}>Users</span>
            </button>
          </Link>
        </Navbar.Brand>
      </Navbar>
      <div className={styles.container}>
        <div className={styles.containerLight}>
          <h3 className={styles.userText}>Create a new user</h3>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label htmlFor="customerName" className={styles.Text}>
                Customer's name:
              </label>
              <input
                className={styles.inputUser}
                type="text"
                id="name"
                name="name"
                placeholder="Enter customer's name"
                value={user.name}
                onChange={handleInputChange}
              />
              <label htmlFor="customerEmail" className={styles.Text}>
                Customer's email:
              </label>
              <input
                className={styles.inputUser}
                type="text"
                id="email"
                name="email"
                placeholder="Enter customer's email"
                value={user.email}
                onChange={handleInputChange}
              />
              <label htmlFor="customerNumber" className={styles.Text}>
                Customer's phone number:
              </label>
              <input
                className={styles.inputUser}
                type="text"
                id="phone"
                name="number"
                placeholder="Enter customer's phone number"
                value={user.number}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.inputGroup}>
              <button type="submit" className={styles.buttonSave}>
                <span className={styles.textButton}>Save</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewUserPage;
