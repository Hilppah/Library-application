package library.collections;

import java.time.LocalDate;

public class RentedBook {
    private String bookId;
    private LocalDate rentedDate;
    private LocalDate dueDate;
    private String title;
    private String renterName;


    public String getBookId() { return bookId; }
    public void setBookId(String bookId) { this.bookId = bookId; }

    public LocalDate getRentedDate() { return rentedDate; }
    public void setRentedDate(LocalDate rentedDate) { this.rentedDate = rentedDate; }

    public LocalDate getDueDate() { return dueDate; }
    public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getRenterName() { return renterName; }
    public void setRenterName(String renterName) { this.renterName = renterName; }
}