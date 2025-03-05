package library.utilities;


import library.collections.LibraryBook;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface BookRepository extends MongoRepository<LibraryBook, String> {
    Optional<LibraryBook> findBookById(String id);

    List<LibraryBook> findAll();

    List<LibraryBook> findByAvailableTrue();

    List<LibraryBook> findByAvailableFalse();
}