package library.controllers;

import library.LibraryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/library")
public class LibraryController {

    @Autowired
    private LibraryService libraryService;

    @PostMapping("/rent")
    public String rentBook(@RequestParam String customerId, @RequestParam String bookId) {
        return libraryService.rentBook(customerId, bookId);
    }
}
