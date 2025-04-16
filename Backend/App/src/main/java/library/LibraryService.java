package library;

import library.collections.LibraryBook;
import library.collections.RentedBook;
import library.collections.User;
import library.utilities.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class LibraryService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private UserRepository userRepository;

    public ResponseEntity<?> rentBook(String customerId, String bookId) {
        Optional<LibraryBook> libraryBook = bookRepository.findById(bookId);
        Optional<User> userOptional = userRepository.findById(customerId);

        if (libraryBook.isEmpty()) {
            return ResponseEntity.status(409).body("The book was not found");
        }

        if (userOptional.isEmpty()) {
            return ResponseEntity.status(409).body("Customer can't be found");
        }

        LibraryBook book = libraryBook.get();
        if (!book.isAvailable()) {
            return ResponseEntity.status(409).body("The book has already been borrowed");
        }

        // Mark book as unavailable and update user
        book.setAvailable(false);
        bookRepository.save(book);

        User user = userOptional.get();
        RentedBook rentedBook = new RentedBook();
        rentedBook.setBookId(book.getId());
        rentedBook.setTitle(book.getTitle());
        rentedBook.setRentedDate(LocalDate.now());
        rentedBook.setDueDate(LocalDate.now().plusDays(14));
        user.getRentedBooks().add(rentedBook);

        userRepository.save(user);

        return ResponseEntity.status(201).body("Book borrowed successfully");
    }

    public ResponseEntity <List <LibraryBook>> findBooks() {
       List<LibraryBook> listBooks = bookRepository.findAll();
        return ResponseEntity.status(200).body(listBooks);
    }

    public List<User> findUsers() {
        return userRepository.findAll();
    }

    public ResponseEntity<List<LibraryBook>> findRentedBooks() {
        return ResponseEntity.status(200).body(bookRepository.findByAvailableFalse());
    }

    public ResponseEntity<List<LibraryBook>> findAvailableBooks() {
        return ResponseEntity.status(200).body(bookRepository.findByAvailableTrue());
    }

    public ResponseEntity<List<RentedBook>> findRentersOfBooks() {
        List<RentedBook> usersThatRented = userRepository.findAll().stream()
                .flatMap(user -> user.getRentedBooks().stream()
                        .peek(rentedBook -> {
                                rentedBook.setRenterId(user.getId());
                                rentedBook.setRenterName(user.getName());
                        })
                ).toList();
        return ResponseEntity.status(200).body(usersThatRented);
    }

    public Optional<User> getUserByID(String customerId) {
        return userRepository.findById(customerId);
    }

    public ResponseEntity<?> returnBook(RentedBook rentedBook) {
        Optional<LibraryBook> libraryBook = bookRepository.findById(rentedBook.getBookId());
        if (libraryBook.isEmpty()) {
            return ResponseEntity.status(409).body("The book was not found");
        }
        LibraryBook book = libraryBook.get();

        book.setAvailable(true);
        bookRepository.save(book);

        Optional<User> optionalUser = userRepository.findById(rentedBook.getRenterId());

        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(404)
                    .body("Renter with ID " + rentedBook.getRenterId() + " not found.");
        }

        User user = optionalUser.get();

        boolean removed = user.getRentedBooks().removeIf(r ->
                r.getBookId().equals(rentedBook.getBookId())
        );

        if (!removed) {
            return ResponseEntity.status(400)
                    .body("Book was not found in user's rented list.");
        }
        userRepository.save(user);
        return ResponseEntity.status(200).body("The book has been returned.");
    }
}
