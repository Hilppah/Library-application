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
  const [year, setYear] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [book, setBook] = useState({
    title: "",
    author: "",
    isRented: false,
  });

  const handleInputChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBook = {
      ...book,
      year: year,
      genres: selectedGenres,
    };

    try {
      const response = await fetch("http://localhost:8080/library/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBook),
      });

      if (!response.ok) {
        throw new Error("Failed to add book");
      }

      alert("Book added successfully!");
      setBook({ title: "", author: "", isRented: false });
      setYear("");
      setSelectedGenres([]);
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

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
          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label htmlFor="bookName" className={styles.Text}>
                Book title:
              </label>
              <input
                className={styles.inputInfo}
                type="text"
                id="title"
                name="title"
                placeholder="Enter books title"
                value={book.title}
                onChange={handleInputChange}
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
                value={book.author}
                onChange={handleInputChange}
              />
              <label htmlFor="publicationYear" className={styles.Text}>
                Publication year:
              </label>
              <input
                className={styles.inputInfo}
                type="text"
                id="year"
                name="year"
                placeholder="Enter the publication year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />

              <label className={styles.Text}>Genres:</label>
              <Container className={styles.containerGenres}>
                <div className={styles.inputGroup}>
                  <div className={styles.genreCheckboxes}>
                    {genres.map((genre) => (
                      <label key={genre} className={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          value={genre}
                          checked={selectedGenres.includes(genre)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedGenres([...selectedGenres, genre]);
                            } else {
                              setSelectedGenres(
                                selectedGenres.filter((g) => g !== genre)
                              );
                            }
                          }}
                        />
                        {genre}
                      </label>
                    ))}
                  </div>
                </div>
              </Container>
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

export default NewBookPage;
