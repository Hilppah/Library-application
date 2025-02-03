package library;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "Customers")
public class Customer {
    @Id
    private String id;
    private String name;
    private String email;
    private List<RentedBook> rentedBooks = new ArrayList<>();

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public List<RentedBook> getRentedBooks() { return rentedBooks; }
    public void setRentedBooks(List<RentedBook> rentedBooks) { this.rentedBooks = rentedBooks; }
}