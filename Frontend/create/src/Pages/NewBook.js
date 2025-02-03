import { Link } from "react-router-dom";
import "../Styling/ReturnBook.css";
import { Navbar } from "react-bootstrap";

const NewBookPage = () => {
  return (
    <div className="Home">
      <Navbar className="Navbar">
        <Navbar.Brand href="#home">
          <Link to="/">
            <button className="buttonHome">
              <span className="textButton">Home</span>
            </button>
          </Link>
          <Link to="/books">
            <button className="buttonBooks">
              <span className="textButton">Books</span>
            </button>
          </Link>
          <Link to="/new-user">
            <button className="buttonReturn">
              <span className="textButton">Save a new user</span>
            </button>
          </Link>
          <Link to="/users">
            <button className="buttonUsers">
              <span className="textButton">Users</span>
            </button>
          </Link>
        </Navbar.Brand>
      </Navbar>
      <div className="containerNewUsePage">
        <div className="containerLight">
          <h3 className="new-userText">Return a book</h3>
          <div className="inputGroup">
            <label htmlFor="bookName" className="Text">
              Book title:
            </label>
            <input
              className="inputUser"
              type="text"
              id="bookName"
              name="bookName"
              placeholder="Enter books title"
            />
            <label htmlFor="authorName" className="Text">
              Author's name:
            </label>
            <input
              className="inputUser"
              type="text"
              id="author"
              name="author"
              placeholder="Enter author's name"
            />
            <label htmlFor="customerNumber" className="Text">
              Customer's name:
            </label>
            <input
              className="inputUser"
              type="text"
              id="phone"
              name="customerNumber"
              placeholder="Enter customer's phone number"
            />
          </div>
          <div className="inputGroup">
            <button className="buttonSave">
              <span className="textButton">Save</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewBookPage;
