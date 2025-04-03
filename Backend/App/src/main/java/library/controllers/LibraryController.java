package library.controllers;

import library.LibraryService;
import library.collections.LibraryBook;
import library.collections.RentedBook;
import library.utilities.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/library")
public class LibraryController {

    @Autowired
    public LibraryService libraryService;

    @Autowired
    public BookRepository bookRepository;

    @PostMapping("/rent")
    public String rentBook(@RequestParam String customerId, @RequestParam String bookId) {
        return libraryService.rentBook(customerId, bookId);
    }

    @GetMapping("/books")
    public List<LibraryBook> getBooks(@RequestParam (required = false, defaultValue = "false") Boolean available) {
        System.out.println(available);
        if (available) {
            return libraryService.findRentedBooks();
        } else {
            return bookRepository.findAll();
        }
    }

    @PostMapping("/books")
    public LibraryBook addBook(@RequestBody LibraryBook book) {
        System.out.println(book.getTitle());
        return bookRepository.save(book);
    }

    @GetMapping("/rentedBooks")
    public List<RentedBook> getRentedBooks (){
        return libraryService.findRentersOfBooks();
    }

    @GetMapping("/availableBooks")
    public List<LibraryBook> availableBooks(){
        return libraryService.findAvailableBooks();
    }

}
