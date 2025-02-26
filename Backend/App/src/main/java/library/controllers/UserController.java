package library.controllers;

import library.LibraryService;
import library.utilities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/library")
public class UserController {

    @Autowired
    public LibraryService libraryService;

    @GetMapping("/users")
    public List<User> getUsers(){
        return libraryService.findUsers();
    }
}
