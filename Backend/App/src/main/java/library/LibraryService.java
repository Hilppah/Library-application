package library;

import library.utilities.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class LibraryService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private UserRepository userRepository;

    public String rentBook(String customerId, String bookId) {
        Optional<LibraryBook> libraryBook = bookRepository.findBookById(bookId);
        Optional<User> userOptional = userRepository.findById(customerId);

        if (libraryBook.isEmpty()) {
            return "The book is unavailable";
        }
        if (userOptional.isEmpty()) {
            return "Customer can't be found";
        }

        LibraryBook book = libraryBook.get();
        if (!book.isAvailable()) {
            return "The book has already been borrowed";
        }
        book.setAvailable(false);
        bookRepository.save(book);

        User user = userOptional.get();
        RentedBook rentedBook = new RentedBook();
        rentedBook.setBookId(book.getId());
        rentedBook.setRentedDate(LocalDate.now());
        rentedBook.setDueDate(LocalDate.now().plusDays(14));

        user.getRentedBooks().add(rentedBook);
        userRepository.save(user);

        return "Book borrowed successfully";
    }

    public List<LibraryBook> findBooks(){
        return bookRepository.findAll();
    }

    public List<User> findUsers(){
        return userRepository.findAll();
    }

    public List<LibraryBook> findRentedBooks(){
    return bookRepository.findByAvailableTrue();
    }

//    public String getUserByID(String CustomerId){
//
//        Optional<User> user = userRepository.findUserById(CustomerId);
//        return user;
//    }
}