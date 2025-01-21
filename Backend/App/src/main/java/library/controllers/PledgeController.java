package library.controllers;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PledgeController {
    @GetMapping("/Hello")
    public String getMessage (){
        return "Greetings! This is a Spring Boot test.";
    }
}
