import { Link } from "react-router-dom";
import styles from "../Styling/NewBook.module.css";
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
    <div className={styles.Home}>
      <Navbar className={styles.Navbar}>
        <Navbar.Brand href="#home">
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
        <div className={styles.containerLight}>
          <h3 className={styles.userText}>Add a new book</h3>
          <div className={styles.inputGroup}>
            <label htmlFor="bookName" className={styles.Text}>
              Book title:
            </label>
            <input
              className={styles.inputInfo}
              type="text"
              id="bookName"
              name="bookName"
              placeholder="Enter books title"
            />
            <label htmlFor="authorName" className={styles.Text}>
              Author's name:
            </label>
            <input
              className={styles.inputInfo}
              type="text"
              id="author"
              name="author"
              placeholder="Enter author's name"
            />
            <label htmlFor="publicationYear" className={styles.Text}>
              Publication year:
            </label>
            <input
              className={styles.inputInfo}
              type="text"
              id="year"
              name="publicationYear"
              placeholder="Enter the publication year"
            />
              <label className={styles.Text}>Genres:</label>
              <Container className={styles.containerGenres}>
                <div className={styles.inputGroup}>
                  <div className={styles.genreCheckboxes}>
                    {genres.map((genre) => (
                      <label key={genre} className={styles.checkboxLabel}>
                        <input type="checkbox" value={genre} onChange={() => setGenre(genre)} />
                        {genre}
                      </label>
                    ))}
                  </div>
                </div>
              </Container>
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

export default NewBookPage;
