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
    private CustomerRepository customerRepository;

    public String rentBook(String customerId, String bookId) {
        Optional<LibraryBook> libraryBook = bookRepository.findBookById(bookId);
        Optional<Customer> customerOpt = customerRepository.findById(customerId);

        if (libraryBook.isEmpty()) {
            return "The book is unavailable";
        }
        if (customerOpt.isEmpty()) {
            return "Customer can't be found";
        }

        LibraryBook book = libraryBook.get();
        if (!book.isAvailable()) {
            return "The book has already been borrowed";
        }
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

    public List<LibraryBook> findBooks(){
        return bookRepository.findAll();
    }

    public List<LibraryBook> findRentedBooks(){
    return bookRepository.findByAvailableTrue();
    }

//    public String getCustomerByID(String CustomerId){
//
//        Optional<Customer> customer = customerRepository.findCustomerById(CustomerId);
//        return customer;
//    }

    public List<Customer> findCustomers(){
        return customerRepository.findAll();
    }
}