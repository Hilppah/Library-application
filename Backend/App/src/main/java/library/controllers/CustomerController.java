package library.controllers;

import library.LibraryService;
import library.utilities.Customer;
import library.utilities.LibraryBook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customer")
public class CustomerController {

    @Autowired
    public LibraryService libraryService;

    @GetMapping("/customers")
    public List<Customer> getCustomers(){
        return libraryService.findCustomers();
    }
}
