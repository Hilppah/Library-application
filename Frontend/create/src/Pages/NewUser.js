import "../Styling/NewUser.css";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const NewUserPage = () => {
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
          <Link to="/new-book">
            <button className="buttonReturn">
              <span className="textButton">Add a new book</span>
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
          <h3 className="new-userText">Create a new user</h3>
          <div className="inputGroup">
            <label htmlFor="customerName" className="Text">
              Customer's name:
            </label>
            <input
              className="inputUser"
              type="text"
              id="name"
              name="customerName"
              placeholder="Enter customer's name"
            />
            <label htmlFor="customerEmail" className="Text">
              Customer's email:
            </label>
            <input
              className="inputUser"
              type="text"
              id="email"
              name="email"
              placeholder="Enter customer's email"
            />
            <label htmlFor="customerNumber" className="Text">
              Customer's phone number:
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

export default NewUserPage;
