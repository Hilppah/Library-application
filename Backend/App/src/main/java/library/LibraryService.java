package library;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.Optional;

@Service
public class LibraryService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private CustomerRepository customerRepository;

    public String rentBook(String customerId, String bookId) {
        Optional<LibraryBook> bookOpt = bookRepository.findByIdAndAvailableTrue(bookId);
        Optional<Customer> customerOpt = customerRepository.findById(customerId);

        if (bookOpt.isEmpty()) {
            return "The book is unavailable";
        }
        if (customerOpt.isEmpty()) {
            return "Customer can't be found";
        }

        LibraryBook book = bookOpt.get();
        book.setAvailable(false);
        bookRepository.save(book);

        Customer customer = customerOpt.get();
        RentedBook rentedBook = new RentedBook();
        rentedBook.setBookId(book.getId());
        rentedBook.setRentedDate(LocalDate.now());
        rentedBook.setDueDate(LocalDate.now().plusDays(14));

        customer.getRentedBooks().add(rentedBook);
        customerRepository.save(customer);

        return "Book borrowed successfully";
    }
}