import { Link } from "react-router-dom";
import "../Styling/NewBook.css";
import { Container, Navbar } from "react-bootstrap";
import { useState } from "react";

const genres = [
  "Children's",
  "Fantasy",
  "Historical fiction",
  "Horror",
  "Non-fiction",
  "Romace",
  "Sci-fi",
  "Thriller",
  "Young adult",
];

const NewBookPage = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState(genres[0]);

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
          <Link to="/users">
            <button className="buttonUsers">
              <span className="textButton">Users</span>
            </button>
          </Link>
          <Link to="/new-user">
            <button className="buttonReturn">
              <span className="textButton">Save a new user</span>
            </button>
          </Link>
        </Navbar.Brand>
      </Navbar>
      <div className="containerNewUsePage">
        <div className="containerLight">
          <h3 className="new-userText">Add a new book</h3>
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
            <label htmlFor="publicationYear" className="Text">
              Publication year:
            </label>
            <input
              className="inputUser"
              type="text"
              id="year"
              name="publicationYear"
              placeholder="Enter the publication year"
            />
            <div>
              <label className="Text">Genres:</label>
              <Container className="containerGenres">
                <div className="inputGroup">
                  <div className="genreCheckboxes">
                    {genres.map((genre) => (
                      <label key={genre} className="checkboxLabel">
                        <input type="checkbox" value={genre} />
                        {genre}
                      </label>
                    ))}
                  </div>
                </div>
              </Container>
            </div>
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
