package library.controllers;

import library.LibraryService;
import library.utilities.LibraryBook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/library")
public class LibraryController {

    @Autowired
    private LibraryService libraryService;

    @PostMapping("/rent")
    public String rentBook(@RequestParam String customerId, @RequestParam String bookId) {
        return libraryService.rentBook(customerId, bookId);
    }

    @GetMapping("/books")
    public List<LibraryBook> getBooks(@RequestParam (required = false, defaultValue = "false") Boolean available){
        System.out.println(available);
        if (available) {
            return libraryService.findRentedBooks();
        }
        else{
            return libraryService.findBooks();
        }
    }
}
