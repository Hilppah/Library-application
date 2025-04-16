package library.controllers;

import library.LibraryService;
import library.collections.LibraryBook;
import library.collections.RentedBook;
import library.utilities.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<?> rentBook(@RequestParam String customerId, @RequestParam String bookId) {
        return libraryService.rentBook(customerId, bookId);
    }

    @GetMapping("/books")
    public ResponseEntity<List<LibraryBook>> getBooks(@RequestParam(required = false) Boolean available) {
        System.out.println(available);
        if( available==null){
            return libraryService.findBooks();
        }
        if (available) {
            return libraryService.findAvailableBooks();
        } else {
            return libraryService.findRentedBooks();
        }
    }

    @PostMapping("/books")
    public ResponseEntity<?> addBook(@RequestBody LibraryBook book) {
        System.out.println(book.getTitle());
        return ResponseEntity.status(201).body(bookRepository.save(book));
    }

    @GetMapping("/rentedBooks")
    public ResponseEntity< List<RentedBook>> getRentedBooks (){
        return libraryService.findRentersOfBooks();
    }

    @PostMapping("/returnBook")
    public ResponseEntity<?> returnBook (@RequestBody RentedBook book){
        return libraryService.returnBook(book);
    }

}
