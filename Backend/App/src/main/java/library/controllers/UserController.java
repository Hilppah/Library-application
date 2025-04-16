package library.controllers;

import library.LibraryService;
import library.collections.LibraryBook;
import library.collections.User;
import library.utilities.BookRepository;
import library.utilities.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/library")
public class UserController {

    @Autowired
    public LibraryService libraryService;

    @Autowired
    public UserRepository userRepository;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers(){
        return ResponseEntity.status(200).body(libraryService.findUsers());
    }

    @PostMapping("/users")
    public ResponseEntity<?> addUser(@RequestBody User newUser) {
        Optional<User> existingUser = Optional.ofNullable(userRepository.findByEmail(newUser.getEmail()));
        if (existingUser.isPresent()) {
            return ResponseEntity.status(409).body("The Email is already in use");
        }

        System.out.println(newUser.getName());
        User savedUser = userRepository.save(newUser);
        return ResponseEntity.status(201).body(savedUser);
    }
}
