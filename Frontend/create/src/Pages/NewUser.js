import styles from "../Styling/NewUser.module.css";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const NewUserPage = () => {
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
          <div className={styles.inputGroup}>
            <label htmlFor="customerName" className={styles.Text}>
              Customer's name:
            </label>
            <input
              className={styles.inputUser}
              type="text"
              id="name"
              name="customerName"
              placeholder="Enter customer's name"
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
            />
            <label htmlFor="customerNumber" className={styles.Text}>
              Customer's phone number:
            </label>
            <input
              className={styles.inputUser}
              type="text"
              id="phone"
              name="customerNumber"
              placeholder="Enter customer's phone number"
            />
          </div>
          <div className={styles.inputGroup}>
            <button className={styles.buttonSave}>
              <span className={styles.textButton}>Save</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewUserPage;
